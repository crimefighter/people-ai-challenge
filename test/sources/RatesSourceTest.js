/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

const response = {
  'base': 'EUR',
  'date': '2017-02-15',
  'rates': {
    'USD': 1.0555
  }
};

import RatesSource from 'sources/RatesSource';
import sinon from 'sinon';
import 'whatwg-fetch';
import {isEqual} from 'lodash';

describe('RatesSource', function () {
  beforeEach(function () {
    fetch = sinon.stub().returns(Promise.resolve({
      json: () => {
        return Promise.resolve(response);
      }
    }));
    this.ratesSource = new RatesSource();
  });

  describe('.fetchRate()', function () {
    let result;
    beforeEach(function () {
      result = this.ratesSource.fetchRate('EUR', 'USD', '2000-01-01');
    });

    it('calls fetch passing constructed url', function () {
      expect(fetch.calledWith('/2000-01-01?base=EUR&symbols=USD'));
    });

    it('returns promise of normalized result using date from request instead of returned date', function () {
      return result.then((rate) => {
        expect(isEqual(rate, {
          'base': 'EUR',
          'compare': 'USD',
          'date': '2000-01-01',
          'value': 1.0555
        }));
      });
    });
  });
});
