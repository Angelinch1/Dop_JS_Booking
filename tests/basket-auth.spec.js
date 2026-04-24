const { test, expect } = require('@playwright/test');
const { AllPages } = require('../pages/AllPages');

function hasBasketCredentials() {
  return !!(process.env.BASKET_TEST_EMAIL && process.env.BASKET_TEST_PASSWORD);
}

test.describe('Авторизация (AllPages)', () => {
  test.describe.configure({ timeout: 60_000 });

  /**
   * Вход через иконку пользователя в шапке — стабильный URL (главная или свой путь).
   * Креды: BASKET_TEST_EMAIL, BASKET_TEST_PASSWORD в .env
   */
  test('authInBag2: вход через иконку пользователя', async ({ page }) => {
    test.skip(!hasBasketCredentials(), 'Задайте BASKET_TEST_EMAIL и BASKET_TEST_PASSWORD в .env');

    const raw = (process.env.BASKET_AUTH_ENTRY_URL || '/').trim();
    const entry = raw || '/';
    await page.goto(entry);

    const all = new AllPages(page);
    await all.authInBag2();

    await expect(page.locator("input[name='LoginInput.Password']")).not.toBeVisible({ timeout: 25_000 });
  });

  /**
   * URL корзины зависит от заказа: сначала допишите шаги сценария до жёлтой кнопки,
   * затем раскомментируйте и вызовите waitForBasketLoginPrompt + authInBag.
   */
  test.fixme('authInBag: вход с экрана заказа (после добавления в корзину)', async () => {
    // const all = new AllPages(page);
    // 1) Шаги до страницы заказа с жёлтой кнопкой «Войти или зарегистрироваться»
    // 2) await all.waitForBasketLoginPrompt();
    // 3) await all.authInBag();
  });
});
