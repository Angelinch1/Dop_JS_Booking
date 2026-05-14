const { test } = require('@playwright/test');
const { AllPages } = require('../pages/AllPages');

test.describe('Бронирование экскурсий', () => {
  test.fixme('основной сценарий: выбор и оформление экскурсии', async ({ page }) => {
    const all = new AllPages(page);
    await all.openBookingSection('excursions');
  });

});
