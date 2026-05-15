const { test, expect } = require('@playwright/test');
const { AllPages } = require('../pages/AllPages');

test.describe('Бронирование экскурсий', () => {
  test('поиск экскурсий', async ({ page }) => {
    test.setTimeout(90_000);

    const all = new AllPages(page);

    await test.step('Открыть страницу поиска экскурсий', async () => {
      await all.openBookingSection('excursions');
    });

    await test.step('Выбрать страну', async () => {
      await all.excursionSelectCountry('Турция');
    });

    await test.step('Выбрать город', async () => {
      await all.excursionSelectCity('Анталья');
    });

    await test.step('Выбрать дату', async () => {
      await all.excursionPickDate();
    });

    await test.step('Нажать «Найти»', async () => {
      await all.excursionClickSearch();
    });

    await test.step('Дождаться выдачи', async () => {
      await all.closeBanners();
      await expect(page).toHaveURL(/searchexcursions/i);
      await expect(page.locator('iframe').first()).toBeVisible({ timeout: 30_000 });
    });
  });
});
