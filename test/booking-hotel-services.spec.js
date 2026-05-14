const { test } = require('@playwright/test');
const { AllPages } = require('../pages/AllPages');

test.describe('Бронирование услуг в отеле', () => {
  test.fixme('основной сценарий: выбор услуги отеля и оформление', async ({ page }) => {
    const all = new AllPages(page);
    await all.openBookingSection('hotelServices');
  });

  test.fixme('негативный сценарий: валидация / конфликт по времени', async ({ page }) => {
    const all = new AllPages(page);
    await all.openBookingSection('hotelServices');
  });
});
