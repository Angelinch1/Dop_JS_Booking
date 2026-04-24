// @ts-check
const { expect } = require('@playwright/test');
const { attachment, step } = require('allure-js-commons');
const { BasePage } = require('./BasePage');

/**
 * Общие шаги (порт с Java Selenide + Allure).
 * Учётные данные задавайте в .env: BASKET_TEST_EMAIL, BASKET_TEST_PASSWORD.
 *
 * URL корзины/заказа часто динамический (зависит от добавленного заказа).
 * Не хардкодьте его: сначала сценарием доведите страницу до экрана с входом,
 * затем вызывайте {@link AllPages#waitForBasketLoginPrompt} и {@link AllPages#authInBag}.
 */
class AllPages extends BasePage {
  /** Блок «Войти или зарегистрироваться» на шаге оформления (жёлтая кнопка). */
  get basketLoginBanner() {
    return this.page.locator('div.v-btn-yellow').filter({ hasText: 'Войти или зарегистрироваться' });
  }

  /**
   * Ждёт, пока на **текущей** странице (любой URL после добавления заказа) появится вход в корзине.
   * @param {{ timeout?: number }} [options]
   */
  async waitForBasketLoginPrompt(options = {}) {
    const { timeout = 30_000 } = options;
    await this.basketLoginBanner.waitFor({ state: 'visible', timeout });
  }
  /**
   * @returns {{ email: string, password: string }}
   */
  _basketCredentials() {
    const email = process.env.BASKET_TEST_EMAIL;
    const password = process.env.BASKET_TEST_PASSWORD;
    if (!email || !password) {
      throw new Error(
        'Задайте BASKET_TEST_EMAIL и BASKET_TEST_PASSWORD в .env для авторизации в корзине.'
      );
    }
    return { email, password };
  }

  /**
   * Аналог @Attachment в Java: скриншот текущей страницы во Allure.
   * @param {string} name
   */
  async attachScreenshot(name) {
    const buf = await this.page.screenshot();
    await attachment(name, buf, 'image/png');
  }

  /**
   * Вход через жёлтую кнопку на странице заказа. Страница уже должна быть открыта
   * (например, после шагов «добавить в корзину» — URL каждый раз свой).
   */
  async authInBag() {
    const { email, password } = this._basketCredentials();
    await step('Авторизация в корзине', async () => {
      await this.basketLoginBanner.click();
      const emailInput = this.page.locator("input[name='LoginInput.Email']");
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toBeEnabled();
      await emailInput.fill(email);
      const passInput = this.page.locator("input[name='LoginInput.Password']");
      await expect(passInput).toBeVisible();
      await expect(passInput).toBeEnabled();
      await passInput.fill(password);
      await passInput.press('Enter');
      await this.attachScreenshot('Авторизация в корзине');
    });
  }

  /** @Step("Авторизация в корзине") — вариант через иконку пользователя */
  async authInBag2() {
    const { email, password } = this._basketCredentials();
    await step('Авторизация в корзине', async () => {
      await this.page.locator('span.v-icon-user-14').click();
      const emailInput = this.page.locator("input[name='LoginInput.Email']");
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toBeEnabled();
      await emailInput.fill(email);
      const passInput = this.page.locator("input[name='LoginInput.Password']");
      await expect(passInput).toBeVisible();
      await expect(passInput).toBeEnabled();
      await passInput.fill(password);
      await new Promise((r) => setTimeout(r, 2000));
      await expect(passInput).toBeVisible();
      await expect(passInput).toBeEnabled();
      await passInput.press('Enter');
      await this.attachScreenshot('Авторизация в корзине');
    });
  }
}

module.exports = { AllPages };
