const { test } = require('@playwright/test');
const { AirportServiceBookingPage } = require('../pages/AirportServiceBookingPage');

test.describe('Бронирование услуг в аэропорту', () => {
  test.fixme('основной сценарий: выбор услуги и оформление', async ({ page }) => {
    const booking = new AirportServiceBookingPage(page);
    await booking.open();
  });

  test.fixme('негативный сценарий: валидация полей / отказ в бронировании', async ({ page }) => {
    const booking = new AirportServiceBookingPage(page);
    await booking.open();
  });
});
