const { BasePage } = require('./BasePage');
const bookingUrls = require('../config/bookingUrls');

/**
 * Раздел «Бронирование экскурсий».
 * TODO: локаторы и шаги после стабилизации UI.
 */
class ExcursionBookingPage extends BasePage {
  constructor(page) {
    super(page);
    this.entryUrl = bookingUrls.excursions;
  }

  async open() {
    await this.goto(this.entryUrl);
    await this.waitForLoad('load');
  }
}

module.exports = { ExcursionBookingPage };
