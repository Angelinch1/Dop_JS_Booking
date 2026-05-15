const { test, expect } = require('@playwright/test');
const { AllPages } = require('../pages/AllPages');

test.describe('Бронирование услуг в аэропорту', () => {
  test('поиск услуг в аэропорту', async ({ page }) => {
    test.setTimeout(90_000);

    const all = new AllPages(page);

    await test.step('Открыть страницу поиска услуг в аэропорту', async () => {
      await all.openBookingSection('airportServices');
    });

    await test.step('Выбрать страну', async () => {
      await all.excursionSelectCountry('Египет');
    });

    await test.step('Выбрать город', async () => {
      await all.excursionSelectCity('Шарм-эль-Шейх');
    });

    await test.step('Выбрать дату', async () => {
      await all.airportPickDate();
    });

    await test.step('Нажать «Найти»', async () => {
      await all.excursionClickSearch();
    });

    await test.step('Дождаться выдачи', async () => {
      await expect(page).toHaveURL(/searchairportservices/i);
      await all.reloadSearchResults();
    });
  });
});
