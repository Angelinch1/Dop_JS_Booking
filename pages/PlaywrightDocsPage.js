const { BasePage } = require('./BasePage');

/**
 * Пример Page Object для демо-теста (playwright.dev).
 * Замените на страницы вашего приложения (Dopbooking).
 */
class PlaywrightDocsPage extends BasePage {
  constructor(page) {
    super(page);
    this.heroHeading = page.getByRole('heading', { name: 'Playwright' });
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async open() {
    await this.goto('/');
    await this.waitForLoad('load');
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }
}

module.exports = { PlaywrightDocsPage };
