const { test } = require('@playwright/test');
const { HotelServiceBookingPage } = require('../pages/HotelServiceBookingPage');

test.describe('Бронирование услуг в отеле', () => {
  test.fixme('основной сценарий: выбор услуги отеля и оформление', async ({ page }) => {
    const booking = new HotelServiceBookingPage(page);
    await booking.open();
  });

  test.fixme('негативный сценарий: валидация / конфликт по времени', async ({ page }) => {
    const booking = new HotelServiceBookingPage(page);
    await booking.open();
  });
});
