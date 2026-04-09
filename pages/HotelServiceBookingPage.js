const { BasePage } = require('./BasePage');
const bookingUrls = require('../config/bookingUrls');

/**
 * Раздел «Бронирование услуг в отеле».
 * TODO: локаторы и шаги после стабилизации UI.
 */
class HotelServiceBookingPage extends BasePage {
  constructor(page) {
    super(page);
    this.entryUrl = bookingUrls.hotelServices;
  }

  async open() {
    await this.goto(this.entryUrl);
    await this.waitForLoad('load');
  }
}

module.exports = { HotelServiceBookingPage };
