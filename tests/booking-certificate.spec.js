const { test } = require('@playwright/test');
const { CertificateBookingPage } = require('../pages/CertificateBookingPage');

test.describe('Бронирование сертификата', () => {
  test.fixme('основной сценарий: оформление сертификата', async ({ page }) => {
    const booking = new CertificateBookingPage(page);
    await booking.open();
  });

  test.fixme('негативный сценарий: валидация данных получателя / суммы', async ({ page }) => {
    const booking = new CertificateBookingPage(page);
    await booking.open();
  });
});
