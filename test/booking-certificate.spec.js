const { test } = require('@playwright/test');
const { AllPages } = require('../pages/AllPages');

test.describe('Бронирование сертификата', () => {
  test.fixme('основной сценарий: оформление сертификата', async ({ page }) => {
    const all = new AllPages(page);
    await all.openBookingSection('certificate');
  });

  test.fixme('негативный сценарий: валидация данных получателя / суммы', async ({ page }) => {
    const all = new AllPages(page);
    await all.openBookingSection('certificate');
  });
});
