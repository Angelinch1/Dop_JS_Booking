const { BasePage } = require('./BasePage');
const bookingUrls = require('../config/bookingUrls');

class AllPages extends BasePage {
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

  async _pickDepartureItem(name) {
    const option = this.page.getByRole('option', { name, exact: true });
    if ((await option.count()) > 0) {
      await option.first().click();
      return;
    }
    await this.page
      .locator('motion.v-departure .v-departure__elem, div.v-departure__elem')
      .filter({ hasText: name })
      .last()
      .click({ force: true });
  }

  async excursionSelectCountry(country = 'Турция') {
    await this.page.locator('.v-departure__pinput').first().click();
    await this._pause(1000);
    await this._pickDepartureItem(country);
    await this._pause();
  }

  async excursionSelectCity(city = 'Анталья') {
    await this.page.locator('#city-excursions-field-input > .v-departure__pinput').click();
    await this._pause(1000);
    await this._pickDepartureItem(city);
    await this._pause();
  }

  async excursionPickDate() {
    const dateField = this.page.locator('.calendar__field').filter({ hasText: 'Дата экскурсии' });
    await dateField.locator('.calendar__field-button').click();
    await this._pause(1000);
    const popup = this.page.locator('motion.div.calendar-popup, div.calendar-popup').first();
    await popup.waitFor({ state: 'visible', timeout: 10000 });
    const nextMonth = popup.locator('.calendar-popup__arrow-right');
    await nextMonth.click();
    await nextMonth.click();
    await popup.locator('span.calendar-popup__text').first().click();
    await this._pause();
  }

  async excursionClickSearch() {
    await this.page.locator('button.v-search-button').click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.closeBanners();
    await this._pause();
  }
}

module.exports = { AllPages };
