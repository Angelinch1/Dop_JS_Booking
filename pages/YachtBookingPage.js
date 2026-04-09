const { BasePage } = require('./BasePage');
const bookingUrls = require('../config/bookingUrls');

/**
 * Раздел «Бронирование яхт».
 * TODO: локаторы и шаги после стабилизации UI.
 */
class YachtBookingPage extends BasePage {
  constructor(page) {
    super(page);
    this.entryUrl = bookingUrls.yachts;
  }

  async open() {
    await this.goto(this.entryUrl);
    await this.waitForLoad('load');
  }
}

module.exports = { YachtBookingPage };
