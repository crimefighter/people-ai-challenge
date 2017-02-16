/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import sinon from 'sinon';

import RateStore from 'stores/RateStore';
import RatesSource from 'sources/RatesSource';

describe('RateStore', function () {
  beforeEach(function () {
    sinon.stub(RatesSource.prototype, 'fetchRate').returns(Promise.resolve({}));
    this.rateStore = new RateStore();
  });

  afterEach(function () {
    RatesSource.prototype.fetchRate.restore();
  });

  it('calls ratesSource.fetchRate only once for each set of arguments', function () {
    this.rateStore.fetchRate('USD', 'CAD', '2000-01-01');
    expect(RatesSource.prototype.fetchRate.calledWith('USD', 'CAD', '2000-01-01'));
    this.rateStore.fetchRate('USD', 'CAD', '2000-01-01');
    expect(RatesSource.prototype.fetchRate.callCount).to.equal(1);
  });
});
