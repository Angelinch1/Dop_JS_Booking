const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/SearchPage');
const { AuthPage } = require('../pages/AuthPage');

test.describe('Бронирование услуг в отеле', () => {
  test('Бронирование услуг в отеле', async ({ page }) => {
    test.setTimeout(120_000);

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
      await search.waitForSearchResults();
    });

    let basket;
    await test.step('Добавить в корзину', async () => {
      basket = await search.addRandomOfferToCart();
    });

    await test.step('Авторизация в корзине', async () => {
      const auth = new AuthPage(basket.page);
      await auth.authInBag();
    });

    await test.step('Страница корзины после авторизации', async () => {
      await basket.expectCartVisible();
    });

    await test.step('Заполнение данных в корзине', async () => {
      await basket.fillTouristData();
    });

    await test.step('Бронирование', async () => {
      await basket.booking();
    });

    await test.step('Страница успешного бронирования', async () => {
      await basket.expectBookingSuccessPage();
    });
  });
});
