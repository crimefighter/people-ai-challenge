/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import config from 'config';
import {difference, map, without} from 'lodash';
import {hashHistory} from 'react-router';

import DatePicker from 'react-datepicker';
import NavigationBar from 'components/NavigationBarComponent';

describe('NavigationBarComponent', function () {
  beforeEach(function () {
    sinon.spy(hashHistory, 'push');

    this.NavigationBar = TestUtils.renderIntoDocument(
      <NavigationBar
        currencies={config.currencies}
        base={config.defaults.base}
        compare={config.defaults.compare}
        date={config.defaults.date}
        days={config.defaults.days}
      />
    );
  });

  afterEach(function () {
    hashHistory.push.restore();
  });

  describe('select boxes', function () {
    beforeEach(function () {
      this.selectBoxes = TestUtils.scryRenderedDOMComponentsWithTag(this.NavigationBar, 'select');
    });

    describe('base currency select', function () {
      it('renders', function () {
        expect(this.selectBoxes[0].name).to.equal('base');
      });

      it('has options for all allowed currencies except one selected for compare', function () {
        expect(difference(
          map(this.selectBoxes[0].children, 'value'),
          without(config.currencies, config.defaults.compare)
        ).length).to.equal(0);
      });

      it('triggers navigation on change', function () {
        this.selectBoxes[0].value = 'GBP';
        TestUtils.Simulate.change(this.selectBoxes[0]);
        expect(hashHistory.push.calledWith({
          pathname: '/GBP/' + config.defaults.compare,
          query: {
            date: config.defaults.date,
            days: config.defaults.days
          }
        })).to.be.true;
      });
    });

    describe('compare currency select', function () {
      it('renders', function () {
        expect(this.selectBoxes[1].name).to.equal('compare');
      });

      it('has options for all allowed currencies except one selected for base', function () {
        expect(difference(
          map(this.selectBoxes[1].children, 'value'),
          without(config.currencies, config.defaults.base)
        ).length).to.equal(0);
      });

      it('triggers navigation on change', function () {
        this.selectBoxes[1].value = 'GBP';
        TestUtils.Simulate.change(this.selectBoxes[1]);
        expect(hashHistory.push.calledWith({
          pathname: '/' + config.defaults.base +'/GBP',
          query: {
            date: config.defaults.date,
            days: config.defaults.days
          }
        })).to.be.true;
      });
    });

    describe('days select', function () {
      it('renders', function () {
        expect(this.selectBoxes[2].name).to.equal('days');
      });

      it('has options for allowed daysOptions', function () {
        expect(this.selectBoxes[2].children.length).to.equal(config.daysOptions.length);
      });

      it('triggers navigation on change', function () {
        this.selectBoxes[2].value = '28';
        TestUtils.Simulate.change(this.selectBoxes[2]);
        expect(hashHistory.push.calledWith({
          pathname: '/'+ config.defaults.base + '/' + config.defaults.compare,
          query: {
            date: config.defaults.date,
            days: '28'
          }
        })).to.be.true;
      });
    });
  });

  describe('date select', function () {
    beforeEach(function () {
      this.datePicker = TestUtils.findRenderedComponentWithType(this.NavigationBar, DatePicker);
    });

    it('renders', function () {
      expect(TestUtils.isCompositeComponent(this.datePicker));
    });

    it('has correct date', function () {
      expect(this.datePicker.props.selected.format('YYYY-MM-DD')).to.equal(config.defaults.date);
    });

    it('triggers navigation on change', function () {
      let input = TestUtils.findRenderedDOMComponentWithTag(this.datePicker, 'input');
      input.value = '01/01/2000';
      TestUtils.Simulate.change(input);
      expect(hashHistory.push.calledWith({
        pathname: '/'+ config.defaults.base + '/' + config.defaults.compare,
        query: {
          date: '2000-01-01',
          days: config.defaults.days
        }
      })).to.be.true;
    });

    it('if future date selected falls back to default date', function () {
      let input = TestUtils.findRenderedDOMComponentWithTag(this.datePicker, 'input');
      input.value = '01/01/2100';
      TestUtils.Simulate.change(input);
      expect(hashHistory.push.calledWith({
        pathname: '/'+ config.defaults.base + '/' + config.defaults.compare,
        query: {
          date: config.defaults.date,
          days: config.defaults.days
        }
      })).to.be.true;
    });
  });

  describe('switch currencies button', function () {
    beforeEach(function () {
      this.switchButton = TestUtils.findRenderedDOMComponentWithTag(this.NavigationBar, 'button');
    });

    it('renders', function () {
      expect(TestUtils.isDOMComponent(this.switchButton)).to.be.true;
    });

    it('triggers navigation on click', function () {
      TestUtils.Simulate.click(this.switchButton);
      expect(hashHistory.push.calledWith({
        pathname: '/'+ config.defaults.compare + '/' + config.defaults.base,
        query: {
          date: config.defaults.date,
          days: config.defaults.days
        }
      })).to.be.true;
    });
  });
});
