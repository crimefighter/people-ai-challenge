import {memoize} from 'lodash';
import RatesSource from '../sources/RatesSource';

class RateStore {
  constructor() {
    this.ratesSource = new RatesSource();
    this.fetchRate = memoize(this.ratesSource.fetchRate.bind(this.ratesSource), buildRateKey);

    function buildRateKey(base, compare, dateString) {
      return [base, compare, dateString].join('-');
    }
  }
}

export default RateStore;
