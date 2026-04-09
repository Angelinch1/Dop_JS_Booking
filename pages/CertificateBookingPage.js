const { BasePage } = require('./BasePage');
const bookingUrls = require('../config/bookingUrls');

/**
 * Раздел «Бронирование сертификата».
 * TODO: локаторы и шаги после стабилизации UI.
 */
class CertificateBookingPage extends BasePage {
  constructor(page) {
    super(page);
    this.entryUrl = bookingUrls.certificate;
  }

  async open() {
    await this.goto(this.entryUrl);
    await this.waitForLoad('load');
  }
}

module.exports = { CertificateBookingPage };
