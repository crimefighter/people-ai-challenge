import moment from 'moment';
import {includes} from 'lodash';
import Promise from 'promise-polyfill';
import config from 'config';

import RateStore from './RateStore';

class RatesStore {
  constructor() {
    this.allowedCurrencies = config.currencies;
    this.rateStore = new RateStore();
  }

  getRates(props) {
    let base = props.base,
        compare = props.compare,
        baseDate = props.date,
        days = Math.min(Number(props.days), config.maxDays);

    if (!this.arePropsValid(base, compare, baseDate, days)) {
      return Promise.reject('Invalid properties');
    }

    let ratePromises = [];
    for (var day = 0; day < days; day++) {
      ratePromises.push(this.rateStore.fetchRate(base, compare, this.buildDateString(baseDate, day)));
    }

    return Promise.all(ratePromises);
  }

  arePropsValid(base, compare, baseDate, days) {
    return (
      base &&
      compare &&
      !isNaN(days) &&
      days > 0 &&
      moment(baseDate).isValid() &&
      includes(this.allowedCurrencies, base) &&
      includes(this.allowedCurrencies, compare)
    );
  }

  buildDateString(baseDate, daysIntoPast) {
    return moment(baseDate).startOf('day').subtract(daysIntoPast, 'days').format(config.dateFormats.param);
  }
}

export default RatesStore;
