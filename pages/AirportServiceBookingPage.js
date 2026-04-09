const { BasePage } = require('./BasePage');
const bookingUrls = require('../config/bookingUrls');

/**
 * Раздел «Бронирование услуг в аэропорту».
 * TODO: локаторы и шаги после стабилизации UI.
 */
class AirportServiceBookingPage extends BasePage {
  constructor(page) {
    super(page);
    this.entryUrl = bookingUrls.airportServices;
  }

  async open() {
    await this.goto(this.entryUrl);
    await this.waitForLoad('load');
  }
}

module.exports = { AirportServiceBookingPage };
