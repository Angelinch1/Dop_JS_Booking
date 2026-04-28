const { expect } = require('@playwright/test');
const { attachment, step, ContentType } = require('allure-js-commons');
const { BasePage } = require('./BasePage');

/** @param {number} ms */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} title
 */
async function attachScreenshot(page, title) {
  const buf = await page.screenshot({ type: 'png' });
  await attachment(title, buf, ContentType.PNG);
}

function basketEmail() {
  return process.env.BASKET_TEST_EMAIL || 'testfsJavaTest@yandex.ru';
}

function basketPassword() {
  return process.env.BASKET_TEST_PASSWORD || 'Abonent13!';
}

/**
 * Общие шаги сценария 
 */
class AllPages extends BasePage {
  constructor(page) {
    super(page);
  }

  /** @returns {{ email: string, password: string }} */
  getBasketCredentials() {
    return { email: basketEmail(), password: basketPassword() };
  }

  async authInBag() {
    await step('Авторизация в корзине', async () => {
      const btn = this.page.locator('div.v-btn-yellow');
      await expect(btn).toContainText('Войти или зарегистрироваться');
      await btn.click();

      const email = this.page.locator("input[name='LoginInput.Email']");
      await email.waitFor({ state: 'visible' });
      await expect(email).toBeEnabled();
      await email.fill(basketEmail());

      const password = this.page.locator("input[name='LoginInput.Password']");
      await password.waitFor({ state: 'visible' });
      await expect(password).toBeEnabled();
      await password.fill(basketPassword());
      await password.press('Enter');

      await attachScreenshot(this.page, 'Авторизация в корзине');
    });
  }

  async authInBag2() {
    await step('Авторизация в корзине', async () => {
      await this.page.locator('span.v-icon-user-14').click();

      const email = this.page.locator("input[name='LoginInput.Email']");
      await email.waitFor({ state: 'visible' });
      await expect(email).toBeEnabled();
      await email.fill(basketEmail());

      const password = this.page.locator("input[name='LoginInput.Password']");
      await password.waitFor({ state: 'visible' });
      await expect(password).toBeEnabled();
      await password.fill(basketPassword());

      await sleep(2000);

      await password.waitFor({ state: 'visible' });
      await expect(password).toBeEnabled();
      await password.press('Enter');

      await attachScreenshot(this.page, 'Авторизация в корзине');
    });
  }

  async addTorristInfo() {
    await step('Заполнение данных туриста', async () => {
      const place = this.page.locator('input#place[name="place"]');
      await place.waitFor({ state: 'visible' });
      await place.fill('на ОТМЕНУ Автотесты улица');
      await sleep(1000);

      const lastName = this.page.locator('#lastName');
      await lastName.waitFor({ state: 'visible', timeout: 5000 });
      await lastName.fill('АвтоИванов');
      await sleep(1000);

      const firstName = this.page.locator('#firstName');
      await firstName.waitFor({ state: 'visible', timeout: 5000 });
      await firstName.fill('АвтоСергей');
      await sleep(1000);

      const middleName = this.page.locator('#middleName');
      await middleName.waitFor({ state: 'visible', timeout: 5000 });
      await middleName.fill('АвтоИванович');
      await sleep(1000);

      await lastName.waitFor({ state: 'visible', timeout: 5000 });
      await lastName.fill('АвтоИванов');

      await this.page.getByText('Номер документа').locator('..').locator('input').fill('124416');
      await this.page.getByText('Cерия документа').locator('..').locator('input').fill('1234');

      await attachScreenshot(this.page, 'Заполнение данных туриста');
    });
  }

  async addTorristInfo2() {
    await step('Заполнение данных туриста', async () => {
      const lastName = this.page.locator('#lastName');
      await lastName.waitFor({ state: 'visible', timeout: 5000 });
      await lastName.fill('АвтоИванов');
      await sleep(1000);

      const firstName = this.page.locator('#firstName');
      await firstName.waitFor({ state: 'visible', timeout: 5000 });
      await firstName.fill('АвтоСергей');
      await sleep(1000);

      const middleName = this.page.locator('#middleName');
      await middleName.waitFor({ state: 'visible', timeout: 5000 });
      await middleName.fill('АвтоИванович');
      await sleep(1000);

      await lastName.waitFor({ state: 'visible', timeout: 5000 });
      await lastName.fill('АвтоИванов');

      await this.page.getByText('Номер документа').locator('..').locator('input').fill('124416');
      await this.page.getByText('Cерия документа').locator('..').locator('input').fill('1234');

      await attachScreenshot(this.page, 'Заполнение данных туриста');
    });
  }

  async booking() {
    await step('Бронирование', async () => {
      const btn = this.page.locator('div.theme-yellow-booking');
      await btn.waitFor({ state: 'visible', timeout: 10_000 });
      await btn.click();
      await attachScreenshot(this.page, 'Бронирование');
    });
  }
}

module.exports = { AllPages };
