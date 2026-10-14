const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/SearchPage');
const { AuthPage } = require('../pages/AuthPage');

const pause = (page, ms = 1000) => page.waitForTimeout(ms);

test.describe('Бронирование сертификата', () => {
  test('Бронирование сертификата', async ({ page }) => {
    test.setTimeout(120_000);

    const search = new SearchPage(page);

    await test.step('Открытие страницы сертификатов', async () => {
      await search.openBookingSection('certificate');
      await expect(page).toHaveURL(/\/certificates/i);
    });
    await pause(page);

    await test.step('Выбор номинала 10 ₽', async () => {
      await search.selectCertificateNominalTenRubles();
    });
    await pause(page);

    await test.step('Заполнение данных отправителя и получателя', async () => {
      await search.fillCertificateSenderRecipient();
    });
    await pause(page);

    const basket = await test.step('Добавить в корзину', () => search.clickAddToCart());
    await pause(page);

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

    await test.step('Оформление', async () => {
      await basket.bookingCertificate();
    });

    await test.step('Страница успешного бронирования', async () => {
      await basket.expectBookingSuccessPage();
    });
  });
});
