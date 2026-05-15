/** Базовый Page Object: хранит ссылку на вкладку Playwright. */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }
}

module.exports = { BasePage };
