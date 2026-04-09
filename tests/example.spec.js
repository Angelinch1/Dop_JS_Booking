const { test, expect } = require('@playwright/test');
const { PlaywrightDocsPage } = require('../pages/PlaywrightDocsPage');

test.describe('Пример: Page Object', () => {
  test('главная страница открывается и виден заголовок', async ({ page }) => {
    const docsPage = new PlaywrightDocsPage(page);
    await docsPage.open();

    await expect(docsPage.heroHeading).toBeVisible();
  });

  test('переход по Get started', async ({ page }) => {
    const docsPage = new PlaywrightDocsPage(page);
    await docsPage.open();
    await docsPage.clickGetStarted();

    await expect(page).toHaveURL(/docs\/intro/);
  });
});
