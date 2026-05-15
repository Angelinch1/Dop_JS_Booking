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
      await all.excursionSelectCountry('Египет');
    });

    await test.step('Выбрать город', async () => {
      await all.excursionSelectCity('Шарм-эль-Шейх');
    });

    await test.step('Выбрать дату', async () => {
      await all.excursionPickDate('Дата экскурсии');
    });

    await test.step('Нажать «Найти»', async () => {
      await all.excursionClickSearch();
    });

    await test.step('Дождаться выдачи', async () => {
      await expect(page).toHaveURL(/searchexcursions/i);
      await all.reloadSearchResults();
    });
  });
});
