/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import sinon from 'sinon';

import config from 'config';
import RatesStore from 'stores/RatesStore';

describe('RatesStore', function () {
  beforeEach(function () {
    this.ratesStore = new RatesStore();
    sinon.stub(this.ratesStore.rateStore, 'fetchRate').returns(Promise.resolve({}));
  });

  afterEach(function () {
    this.ratesStore.rateStore.fetchRate.restore();
  });

  describe('.getRates()', function () {
    describe('when passed valid arguments', function () {
      let result;

      beforeEach(function () {
        result = this.ratesStore.getRates({
          base: 'USD',
          compare: 'CAD',
          date: '2000-01-01',
          days: 2
        });
      });

      it('calls RateStore.fetchRate once for each day', function () {
        expect(this.ratesStore.rateStore.fetchRate.calledWith('USD', 'CAD', '2000-01-01'));
        expect(this.ratesStore.rateStore.fetchRate.calledWith('USD', 'CAD', '1999-12-31'));
        expect(this.ratesStore.rateStore.fetchRate.callCount).to.equal(2);
      });

      it('returns a promise', function () {
        expect(result.then).to.be.a('function');
      });
    });

    describe('when passed too many days', function () {
      let result;

      beforeEach(function () {
        result = this.ratesStore.getRates({
          base: 'USD',
          compare: 'CAD',
          date: '2000-01-01',
          days: 100
        });
      });

      it('uses config.maxDays instead', function () {
        expect(this.ratesStore.rateStore.fetchRate.callCount).to.equal(config.maxDays);
      });
    });

    describe('when passed invalid data', function () {
      it('returns rejected promise when passed invalid base currency', function () {
        return expectRejectedPromise(this.ratesStore.getRates({
          base: '$$$',
          compare: 'CAD',
          date: '2000-01-01',
          days: 2
        }));
      });

      it('returns rejected promise when passed invalid compare currency', function () {
        return expectRejectedPromise(this.ratesStore.getRates({
          base: 'CAD',
          compare: '$$$',
          date: '2000-01-01',
          days: 2
        }));
      });

      it('returns rejected promise when passed invalid date', function () {
        return expectRejectedPromise(this.ratesStore.getRates({
          base: 'CAD',
          compare: '$$$',
          date: '2000-01-',
          days: 2
        }));
      });

      it('returns rejected promise when passed invalid number of days', function () {
        return expectRejectedPromise(this.ratesStore.getRates({
          base: 'CAD',
          compare: '$$$',
          date: '2000-01-01',
          days: 'badger'
        }));
      });

      function expectRejectedPromise(result) {
        return result.then(() => {}, (error) => {
          expect(error);
        });
      }
    });
  });
});
