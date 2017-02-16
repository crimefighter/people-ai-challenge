/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import config from 'config';
import App from 'components/AppComponent';
import TitleBar from 'components/TitleBarComponent';
import NavigationBar from 'components/NavigationBarComponent';
import RatesDisplay from 'components/RatesDisplayComponent';

describe('AppComponent', function () {

  describe('basic expectations', function () {
    beforeEach(function () {
      this.AppComponent = createComponent(App);
    });

    it('renders TitleBar', function () {
      expect(TestUtils.isCompositeComponentWithType(this.AppComponent.props.children[0], TitleBar));
    });

    it('passes default props to TitleBar', function () {
      let props = this.AppComponent.props.children[0].props;
      expect(props.base).to.equal(config.defaults.base);
      expect(props.compare).to.equal(config.defaults.compare);
      expect(props.date).to.equal(config.defaults.date);
      expect(props.days).to.equal(config.defaults.days);
    });

    it('renders NavigationBar', function () {
      expect(TestUtils.isCompositeComponentWithType(this.AppComponent.props.children[1], NavigationBar));
    });

    it('passes default props to NavigationBar', function () {
      let props = this.AppComponent.props.children[1].props;
      expect(props.currencies).to.equal(config.currencies);
      expect(props.base).to.equal(config.defaults.base);
      expect(props.compare).to.equal(config.defaults.compare);
      expect(props.date).to.equal(config.defaults.date);
      expect(props.days).to.equal(config.defaults.days);
    });

    it('renders RatesDisplay', function () {
      expect(TestUtils.isCompositeComponentWithType(this.AppComponent.props.children[2], RatesDisplay));
    });

    it('passes default props to RatesDisplay', function () {
      let props = this.AppComponent.props.children[2].props;
      expect(props.base).to.equal(config.defaults.base);
      expect(props.compare).to.equal(config.defaults.compare);
      expect(props.date).to.equal(config.defaults.date);
      expect(props.days).to.equal(config.defaults.days);
    });
  });

  describe('with custom props from router', function () {
    let customProps = {
      params: {
        base: 'BDG',
        compare: 'SNK'
      },
      location: {
        query: {
          date: '2000-01-01',
          days: 100
        }
      }
    };

    beforeEach(function () {
      this.AppComponent = createComponent(App, customProps);
    });

    it('passes custom props to TitleBar', function () {
      let props = this.AppComponent.props.children[0].props;
      expect(props.base).to.equal(customProps.params.base);
      expect(props.compare).to.equal(customProps.params.compare);
      expect(props.date).to.equal(customProps.location.query.date);
      expect(props.days).to.equal(customProps.location.query.days);
    });

    it('passes custom props to NavigationBar', function () {
      let props = this.AppComponent.props.children[1].props;
      expect(props.base).to.equal(customProps.params.base);
      expect(props.compare).to.equal(customProps.params.compare);
      expect(props.date).to.equal(customProps.location.query.date);
      expect(props.days).to.equal(customProps.location.query.days);
    });

    it('passes custom props to RatesDisplay', function () {
      let props = this.AppComponent.props.children[2].props;
      expect(props.base).to.equal(customProps.params.base);
      expect(props.compare).to.equal(customProps.params.compare);
      expect(props.date).to.equal(customProps.location.query.date);
      expect(props.days).to.equal(customProps.location.query.days);
    });
  });
});
