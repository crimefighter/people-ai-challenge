/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import RateCalculationsStore from 'stores/RateCalculationsStore';

describe('RateCalculationsStore', function () {
  beforeEach(function () {
    this.calcs = new RateCalculationsStore();
  });

  describe('.getMeanValue()', function () {
    it('returns mean of rate values', function () {
      expect(this.calcs.getMeanValue([
        {value: 4}, {value: 36}, {value: 45},
        {value: 50}, {value: 75}
      ])).to.equal(42);
    });
  });

  describe('.getStandardDeviation()', function () {
    it('returns standard deviation of rate value using precalculated mean value', function () {
      expect(this.calcs.getStandardDeviation([
        {value: 2}, {value: 4}, {value: 4}, {value: 4},
        {value: 5}, {value: 5}, {value: 7}, {value: 7}, {value: 9}
      ], 5)).to.equal(2);
    });
  });
});
