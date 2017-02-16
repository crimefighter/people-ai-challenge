import {mean} from 'lodash';

class RateCalculationsStore {
  getMeanValue(rates) {
    return rates && mean(rates.map((rate) => {
      return rate.value;
    }));
  }

  getStandardDeviation(rates, meanValue) {
    let squaredDeviations = rates.map((rate) => {
      return Math.pow(meanValue - rate.value, 2);
    });
    return Math.sqrt(mean(squaredDeviations));
  }
}

export default RateCalculationsStore;
