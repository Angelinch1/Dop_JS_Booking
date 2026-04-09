/**
 * Базовый класс Page Object: общие действия и ожидания.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '') {
    await this.page.goto(path);
  }

  async waitForLoad(state = 'domcontentloaded') {
    await this.page.waitForLoadState(state);
  }

  get title() {
    return this.page.title();
  }
}

module.exports = { BasePage };
