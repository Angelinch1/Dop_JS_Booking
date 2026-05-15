const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/SearchPage');

test.describe('Бронирование услуг в аэропорту', () => {
  test('добавление в корзину услуг в аэропорту', async ({ page }) => {
    test.setTimeout(90_000);

    const search = new SearchPage(page);

    await test.step('Открыть страницу поиска услуг в аэропорту', async () => {
      await search.openBookingSection('airportServices');
    });

    await test.step('Выбрать страну', async () => {
      await search.selectCountry('Египет');
    });

    await test.step('Выбрать город', async () => {
      await search.selectCity('Шарм-эль-Шейх');
    });

    await test.step('Выбрать дату', async () => {
      await search.airportPickDate();
    });

    await test.step('Нажать «Найти»', async () => {
      await search.clickSearch();
    });

    await test.step('Дождаться выдачи', async () => {
      await expect(page).toHaveURL(/searchairportservices/i);
      await search.reloadSearchResults();
    });

    await test.step('Добавить в корзину', async () => {
      await search.addRandomOfferToCart();
    });
  });
});
