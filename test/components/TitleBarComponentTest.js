/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import createComponent from 'helpers/shallowRenderHelper';
import moment from 'moment';

import config from 'config';
import TitleBar from 'components/TitleBarComponent';

describe('TitleBarComponent', function () {
  beforeEach(function () {
    this.titleBar = createComponent(TitleBar, config.defaults);
  });

  it('has text-center class', function () {
    expect(this.titleBar.props.className).to.equal('text-center');
  });

  it('renders base currency', function () {
    expect(this.titleBar.props.children).to.contain(config.defaults.base);
  });

  it('renders compare currency', function () {
    expect(this.titleBar.props.children).to.contain(config.defaults.compare);
  });

  it('renders from date based on number of days', function () {
    expect(this.titleBar.props.children).to.contain(moment().subtract(config.defaults.days, 'days').format(config.dateFormats.title));
  });

  it('renders to date', function () {
    expect(this.titleBar.props.children).to.contain(moment(config.defaults.date).format(config.dateFormats.title));
  });
});
