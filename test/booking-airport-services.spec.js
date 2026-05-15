const { test } = require('@playwright/test');
const { AllPages } = require('../pages/AllPages');

test.describe('Бронирование услуг в аэропорту', () => {
  test.fixme('основной сценарий: выбор услуги и оформление', async ({ page }) => {
    const all = new AllPages(page);
    await all.openBookingSection('airportServices');
  });

});
