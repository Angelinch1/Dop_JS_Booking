const { test } = require('@playwright/test');
const { AllPages } = require('../pages/AllPages');

test.describe('Бронирование яхт', () => {
  test.fixme('основной сценарий: выбор яхты / слота и оформление', async ({ page }) => {
    const all = new AllPages(page);
    await all.openBookingSection('yachts');
  });

});
