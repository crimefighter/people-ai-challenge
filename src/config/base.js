'use strict';

import moment from 'moment';

// Settings configured here will be merged into the final config object.
export default {
  apiURL: 'http://api.fixer.io',
  defaults: {
    base: 'USD',
    compare: 'EUR',
    date: moment(new Date()).format('YYYY-MM-DD'),
    days: 21,
    currencies: [
      'AUD',
      'BGN',
      'BRL',
      'CAD',
      'CHF',
      'CNY',
      'CZK',
      'DKK',
      'EUR',
      'GBP',
      'HKD',
      'HRK',
      'HUF',
      'IDR',
      'ILS',
      'INR',
      'JPY',
      'KRW',
      'MXN',
      'MYR',
      'NOK',
      'NZD',
      'PHP',
      'PLN',
      'RON',
      'RUB',
      'SEK',
      'SGD',
      'THB',
      'TRY',
      'USD',
      'ZAR'
    ]
  }
}
