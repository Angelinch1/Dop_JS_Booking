const { test } = require('@playwright/test');
const { ExcursionBookingPage } = require('../pages/ExcursionBookingPage');

test.describe('Бронирование экскурсий', () => {
  test.fixme('основной сценарий: выбор и оформление экскурсии', async ({ page }) => {
    const booking = new ExcursionBookingPage(page);
    await booking.open();
  });

  test.fixme('негативный сценарий: валидация / недоступность слота', async ({ page }) => {
    const booking = new ExcursionBookingPage(page);
    await booking.open();
  });
});
