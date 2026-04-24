const { test, expect } = require('@playwright/test');

/**
 * Быстрая проверка окружения (BASE_URL из .env / playwright.config).
 *
 * Запуск:
 *   npm run test:smoke
 *   npm run test:smoke -- --headed
 *   npm run test:smoke -- --debug
 */
test.describe('Smoke', () => {
  test('главная baseURL открывается и отдаёт успешный ответ', async ({ page }) => {
    const response = await page.goto('/');
    expect(response, 'ответ сервера').not.toBeNull();
    expect(response.ok(), `HTTP ${response.status()}`).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
  });
});
