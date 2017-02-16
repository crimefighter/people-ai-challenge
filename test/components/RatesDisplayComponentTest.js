/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import moment from 'moment';
import {BarChart} from 'recharts';
import Promise from 'promise-polyfill';
import {difference, round} from 'lodash';

import config from 'config';
import RatesDisplay from 'components/RatesDisplayComponent';
import RatesStore from 'stores/RatesStore';
import RateCalculationsStore from 'stores/RateCalculationsStore';

const rates = [
  {
    base: 'USD',
    compare: 'EUR',
    date: config.defaults.date,
    value: 1.12345
  },
  {
    base: 'USD',
    compare: 'EUR',
    date: moment(config.defaults.date).subtract(1, 'day').format(config.dateFormats.param),
    value: 0.512345
  }
];

const meanValue = 0.751234,
      standardDeviation = 0.251234;

describe('RatesDisplayComponent', function () {
  describe('success', function () {
    beforeEach(function () {
      sinon.stub(RatesStore.prototype, 'getRates').returns(Promise.resolve(rates));
      sinon.stub(RateCalculationsStore.prototype, 'getMeanValue').returns(meanValue);
      sinon.stub(RateCalculationsStore.prototype, 'getStandardDeviation').returns(standardDeviation);

      this.RatesDisplay = TestUtils.renderIntoDocument(
        <RatesDisplay
          base={config.defaults.base}
          compare={config.defaults.compare}
          date={config.defaults.date}
          days={config.defaults.days}
        />
      );
    });

    afterEach(function () {
      RatesStore.prototype.getRates.restore();
      RateCalculationsStore.prototype.getMeanValue.restore();
      RateCalculationsStore.prototype.getStandardDeviation.restore();
    });

    describe('chart', function () {
      let chart;
      beforeEach(function () {
        chart = TestUtils.findRenderedComponentWithType(this.RatesDisplay, BarChart);
      });

      it('renders', function () {
        expect(TestUtils.isCompositeComponent(chart)).to.equal(true);
      });

      it('receives normalized data', function () {
        return Promise.resolve().then(() => {
          expect(chart.props.data.length).to.equal(2);
          expect(difference(chart.props.data[0], {
            base: 'USD',
            compare: 'EUR',
            date: '2017-02-14',
            value: rates[0].value,
            name: 'Feb 14',
            chartValue: round(rates[0].value, 3) * this.RatesDisplay.props.scaleFactor
          }).length).to.equal(0);
          expect(difference(chart.props.data[1], {
            base: 'USD',
            compare: 'EUR',
            date: '2017-02-15',
            value: rates[1].value,
            name: 'Feb 15',
            chartValue: round(rates[1].value, 3) * this.RatesDisplay.props.scaleFactor
          }).length).to.equal(0);
        });
      });
    });

    describe('legend', function () {
      let legend;
      beforeEach(function () {
        legend = TestUtils.findRenderedDOMComponentWithClass(this.RatesDisplay, 'legend');
      });

      it('contains mean value and standard deviation', function () {
        return Promise.resolve().then(() => {
          expect(legend.innerHTML).to.contain(round(meanValue, 3).toString());
          expect(legend.innerHTML).to.contain(round(standardDeviation, 4).toString());
        });
      });
    });
  });

  describe('updating', function () {
    let node = document.createElement('div');
    beforeEach(function () {
      this.RatesDisplay = ReactDOM.render(
        <RatesDisplay
          base={config.defaults.base}
          compare={config.defaults.compare}
          date={config.defaults.date}
          days={config.defaults.days}
        />, node
      );

      sinon.spy(this.RatesDisplay, 'populateRates');
    });

    afterEach(function () {
      this.RatesDisplay.populateRates.restore();
    });

    it('calls populateRates on update', function () {
      ReactDOM.render(
        <RatesDisplay
          base={'GDP'}
          compare={config.defaults.compare}
          date={config.defaults.date}
          days={config.defaults.days}
        />, node
      );
      expect(this.RatesDisplay.populateRates.called).to.equal(true);;
    });
  });

  describe('loading', function () {
    let node = document.createElement('div');
    beforeEach(function () {
      sinon.stub(RatesStore.prototype, 'getRates').returns(Promise.resolve(rates));
      sinon.stub(RateCalculationsStore.prototype, 'getMeanValue').returns(meanValue);
      sinon.stub(RateCalculationsStore.prototype, 'getStandardDeviation').returns(standardDeviation);

      this.RatesDisplay = ReactDOM.render(
        <RatesDisplay
          base={config.defaults.base}
          compare={config.defaults.compare}
          date={config.defaults.date}
          days={config.defaults.days}
        />, node
      );
    });

    afterEach(function () {
      RatesStore.prototype.getRates.restore();
      RateCalculationsStore.prototype.getMeanValue.restore();
      RateCalculationsStore.prototype.getStandardDeviation.restore();
    });

    it('sets state to loading on update', function () {
      this.RatesDisplay.state.loading = false;
      ReactDOM.render(
        <RatesDisplay
          base={'GDP'}
          compare={config.defaults.compare}
          date={config.defaults.date}
          days={config.defaults.days}
        />, node
      );
      expect(this.RatesDisplay.state.loading).to.equal(true);
      return Promise.resolve().then(() => {
        expect(this.RatesDisplay.state.loading).to.equal(false);
      });
    });
  });

  describe('failure', function () {
    beforeEach(function () {
      sinon.stub(RatesStore.prototype, 'getRates').returns(Promise.reject('error'));
      sinon.stub(RateCalculationsStore.prototype, 'getMeanValue').returns(meanValue);
      sinon.stub(RateCalculationsStore.prototype, 'getStandardDeviation').returns(standardDeviation);

      this.RatesDisplay = TestUtils.renderIntoDocument(
        <RatesDisplay
          base={config.defaults.base}
          compare={config.defaults.compare}
          date={config.defaults.date}
          days={config.defaults.days}
        />
      );
    });

    afterEach(function () {
      RatesStore.prototype.getRates.restore();
      RateCalculationsStore.prototype.getMeanValue.restore();
      RateCalculationsStore.prototype.getStandardDeviation.restore();
    });

    it('renders error message', function () {
      return Promise.resolve().then(() => {
        let error = TestUtils.findRenderedDOMComponentWithClass(this.RatesDisplay, 'text-error');
        expect(error.innerHTML).to.contain('Error');
      });
    });
  });
});
