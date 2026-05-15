const { test } = require('@playwright/test');
const { SearchPage } = require('../pages/SearchPage');

test.describe('Бронирование сертификата', () => {
  test.fixme('основной сценарий: оформление сертификата', async ({ page }) => {
    const search = new SearchPage(page);
    await search.openBookingSection('certificate');
  });

});
