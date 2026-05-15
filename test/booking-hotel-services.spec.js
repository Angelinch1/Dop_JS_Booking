const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/SearchPage');

test.describe('Бронирование услуг в отеле', () => {
  test('Добавление в корзину услуг в отеле', async ({ page }) => {
    test.setTimeout(90_000);

    const search = new SearchPage(page);

    await test.step('Открыть страницу поиска услуг в отеле', async () => {
      await search.openBookingSection('hotelServices');
    });

    await test.step('Выбрать страну', async () => {
      await search.selectCountry('Египет');
    });

    await test.step('Выбрать город', async () => {
      await search.selectCity('Шарм-эль-Шейх');
    });

    await test.step('Выбрать дату', async () => {
      await search.hotelPickDate();
    });

    await test.step('Нажать «Найти»', async () => {
      await search.clickSearch();
    });

    await test.step('Дождаться выдачи', async () => {
      await expect(page).toHaveURL(/searchhotelservices/i);
      await search.reloadSearchResults();
    });

    await test.step('Добавить в корзину', async () => {
      await search.addRandomOfferToCart();
    });
  });
});
