/**
 * Точки входа в сценарии бронирования на fstravel.com.
 * Переопределяются через переменные окружения (см. .env.example).
 */
module.exports = {
  excursions: process.env.BOOKING_EXCURSIONS_URL || 'https://fstravel.com/searchexcursions',
  airportServices:
    process.env.BOOKING_AIRPORT_SERVICES_URL || 'https://fstravel.com/searchairportservices',
  yachts: process.env.BOOKING_YACHTS_URL || 'https://fstravel.com/searchyachtrent',
  certificate: process.env.BOOKING_CERTIFICATE_URL || 'https://fstravel.com/certificates',
  hotelServices:
    process.env.BOOKING_HOTEL_SERVICES_URL || 'https://fstravel.com/searchhotelservices',
};
