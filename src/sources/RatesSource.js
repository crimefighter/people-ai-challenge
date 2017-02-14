import config from 'config';

class RatesSource {
  constructor() {
    this.apiUrl = config.apiURL;
  }

  fetchRate(base, compare, dateString) {
    return fetch(this.buildUrl(base, compare, dateString)).then((response) => {
      return response.json().then((rate) => {
        return this.normalizeRate(rate, compare, dateString);
      });
    });
  }

  buildUrl(base, compare, dateString) {
    return [this.apiUrl,
      '/', dateString,
      '?base=', base,
      '&symbols=', compare
    ].join('');
  }

  normalizeRate(rate, compare, dateString) {
    return {
      name: dateString,
      base: rate.base,
      compare: compare,
      //date in response may not be equal to requested date
      //due to weekends - using requested date
      date: dateString,
      value: rate.rates[compare]
    }
  }
}

export default RatesSource;
