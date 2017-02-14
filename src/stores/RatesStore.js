import moment from 'moment';
import RateStore from './RateStore';

class RatesStore {
  constructor() {
    this.rateStore = new RateStore();
  }

  getRates(props) {
    let base = props.base,
        compare = props.compare,
        baseDate = props.date,
        days = Number(props.days);

    if (!this.arePropsValid(base, compare, baseDate, days)) {
      throw ['Invalid properties', base, compare, baseDate, days].join(', ');
    }

    let ratePromises = [];
    for (var day = 0; day < days; day++) {
      ratePromises.push(this.rateStore.fetchRate(base, compare, this.buildDateString(baseDate, day)));
    }

    return Promise.all(ratePromises);
  }

  arePropsValid(base, compare, baseDate, days) {
    return base && compare && moment(baseDate).isValid() && !isNaN(days);
  }

  buildDateString(baseDate, daysIntoPast) {
    return moment(baseDate).startOf('day').subtract(daysIntoPast, 'days').format('YYYY-MM-DD');
  }
}

export default RatesStore;
