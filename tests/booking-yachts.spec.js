const { test } = require('@playwright/test');
const { YachtBookingPage } = require('../pages/YachtBookingPage');

test.describe('Бронирование яхт', () => {
  test.fixme('основной сценарий: выбор яхты / слота и оформление', async ({ page }) => {
    const booking = new YachtBookingPage(page);
    await booking.open();
  });

  test.fixme('негативный сценарий: нет доступных дат / валидация', async ({ page }) => {
    const booking = new YachtBookingPage(page);
    await booking.open();
  });
});
