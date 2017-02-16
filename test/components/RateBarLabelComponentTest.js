/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import createComponent from 'helpers/shallowRenderHelper';
import {isEqual} from 'lodash';

import RateBarLabel from 'components/RateBarLabelComponent';

const props = {
  x: 10,
  y: 20,
  payload: {value: 10.12345},
  mean: 5,
  textAnchor: 'middle'
}

describe('RateBarLabelComponent', function () {
  describe('when value > mean', function () {
    beforeEach(function () {
      window.innerWidth = 1800;
      this.label = createComponent(RateBarLabel, props);
    });

    it('renders green text component', function () {
      expect(isEqual(this.label.props, {
        x: 10,
        y: 20,
        angle: 0,
        fill: '#c9fdc9',
        textAnchor: 'middle',
        verticalAnchor: 'end',
        children: 10.123,
        lineHeight: '1em',
        capHeight: '0.71em',
        scaleToFit: false
      })).to.equal(true);
    });
  });

  describe('when value < mean', function () {
    beforeEach(function () {
      window.innerWidth = 1800;
      this.label = createComponent(RateBarLabel, Object.assign({}, props, {
        mean: 15
      }));
    });

    it('renders green text component', function () {
      expect(isEqual(this.label.props, {
        x: 10,
        y: 20,
        fill: '#ffcccb',
        textAnchor: 'middle',
        children: 10.123,
        angle: 0,
        textAnchor: 'middle',
        verticalAnchor: 'end',
        lineHeight: '1em',
        capHeight: '0.71em',
        scaleToFit: false
      })).to.equal(true);
    });
  });

  describe('when window width < 960px', function () {
    beforeEach(function () {
      window.innerWidth = 800;
      this.label = createComponent(RateBarLabel, Object.assign({}, props, {
        mean: 15
      }));
    });

    it('renders vertical text component', function () {
      expect(isEqual(this.label.props, {
        x: 10,
        y: 20,
        angle: 270,
        fill: '#ffcccb',
        children: 10.123,
        textAnchor: 'start',
        verticalAnchor: 'middle',
        lineHeight: '1em',
        capHeight: '0.71em',
        scaleToFit: false
      })).to.equal(true);
    });
  });
});
