const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const bookingUrls = require('../config/bookingUrls');

/** Поиск туров / доп. услуг: форма страна–город–дата, выдача. */
class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this._bannerHandlerInstalled = false;
  }

  /** Пауза между шагами */
  async _pause(ms = 1500) {
    await this.page.waitForTimeout(ms);
  }

  /** @param {keyof typeof bookingUrls} section */
  async openBookingSection(section) {
    const url = bookingUrls[section];
    if (!url) throw new Error(`Неизвестный раздел: ${section}`);
    await this.page.goto(url);
    await this.page.locator('.v-departure__pinput').first().waitFor({ state: 'visible', timeout: 15000 });
    await this.ensureAutoCloseBanners();
    await this.closeBanners();
  }

  /** Автозакрытие баннера «Будьте в курсе!», если он перекрывает клик */
  async ensureAutoCloseBanners() {
    if (this._bannerHandlerInstalled) return;
    this._bannerHandlerInstalled = true;
    const banner = this.page.getByText('Будьте в курсе');
    await this.page.addLocatorHandler(banner, async () => {
      await this.closeBanners();
    });
  }

  async closeBanners() {
    const p = this.page;
    await p.keyboard.press('Escape').catch(() => {});
    await p.locator('button.close[data-dismiss="modal"]').click({ timeout: 1500 }).catch(() => {});
    await p.getByRole('button', { name: /Нет,?\s*спасибо/i }).first().click({ timeout: 1000 }).catch(() => {});
  }

  /** Дождаться выдачи, подождать 3 с, перезагрузить, снова дождаться выдачи */
  async reloadSearchResults() {
    await this.page.getByText(/найдено/i).waitFor({ state: 'visible', timeout: 30000 });
    await this.page.waitForTimeout(3000);
    await this.page.reload();
    await this.page.getByText(/найдено/i).waitFor({ state: 'visible', timeout: 30000 });
  }

  /** Случайная карточка и добавление в корзину */
  async addRandomOfferToCart() {
    let btns = this.page.locator('button.excursion-card__content-btn');
    if ((await btns.count()) === 0) {
      btns = this.page.frameLocator('iframe').first().locator('button.excursion-card__content-btn');
    }
    await btns.first().waitFor({ state: 'visible', timeout: 20000 });
    const n = await btns.count();
    const i = Math.floor(Math.random() * n);
    await btns.nth(i).scrollIntoViewIfNeeded();
    await btns.nth(i).click();

    const modal = this.page.locator('.excursion-modal');
    await modal.waitFor({ state: 'visible', timeout: 20000 });

    const calPopup = modal.locator('.calendar-popup');
    await modal.locator('.excursion-modal-main__buttons .calendar__field-button').click();
    await calPopup.waitFor({ state: 'visible', timeout: 10000 });
    await modal
      .locator('.calendar-popup__cell-case:not(.calendar-popup__cell-gray) span.calendar-popup__text')
      .first()
      .click();

    const continueBtn = modal.getByRole('button', { name: 'Продолжить' });
    await expect(continueBtn).toBeEnabled({ timeout: 15000 });
    const [bookingTab] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      continueBtn.click(),
    ]);
    await bookingTab.waitForLoadState('domcontentloaded');
  }

  async selectCountry(country = 'Египет') {
    await this.page.locator('.v-departure__pinput').first().click();
    await this._pause(1000);
    await this.page.getByText(country, { exact: true }).click();
    await this._pause();
  }

  async selectCity(city = 'Шарм-эль-Шейх') {
    await this.page.locator('#city-excursions-field-input > .v-departure__pinput').click();
    await this._pause(1000);
    await this.closeBanners();
    await this.page.getByText(city, { exact: true }).last().click();
    await this._pause();
  }

  async _pickCalendarPopup() {
    const popup = this.page.locator('motion.div.calendar-popup, div.calendar-popup').first();
    await popup.waitFor({ state: 'visible', timeout: 10000 });
    const nextMonth = popup.locator('.calendar-popup__arrow-right');
    await nextMonth.click();
    await nextMonth.click();
    await popup.locator('span.calendar-popup__text').first().click();
    await this._pause();
  }

  async excursionPickDate(dateLabel = 'Дата экскурсии') {
    const dateField = this.page.locator('.calendar__field').filter({ hasText: dateLabel });
    await dateField.locator('.calendar__field-button').click();
    await this._pause(1000);
    await this._pickCalendarPopup();
  }

  async airportPickDate() {
    const dateField = this.page.locator('.calendar__field').filter({ hasText: 'Даты поездки' });
    await dateField.locator('.calendar__field-button').click();
    await this._pause(1000);
    await this._pickCalendarPopup();
  }

  async hotelPickDate() {
    await this.page.getByText('Дата Выбрать').click();
    await this._pause(1000);
    await this._pickCalendarPopup();
  }

  async yachtPickDate() {
    await this.page.getByText('Дата Выбрать').click();
    await this._pause(1000);
    await this._pickCalendarPopup();
  }

  async clickSearch() {
    await this.page.locator('button.v-search-button').click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { SearchPage };
