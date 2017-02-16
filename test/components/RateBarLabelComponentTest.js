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
      this.label = createComponent(RateBarLabel, props);
    });

    it('renders green text component', function () {
      console.log(this.label.props);
      expect(isEqual(this.label.props.children, {
        x: 10,
        y: 20,
        fill: '#c9fdc9',
        textAnchor: 'middle',
        children: 10.123
      }));
    });
  });

  describe('when value < mean', function () {
    beforeEach(function () {
      this.label = createComponent(RateBarLabel, Object.assign({}, props, {
        mean: 15
      }));
    });

    it('renders green text component', function () {
      console.log(this.label.props);
      expect(isEqual(this.label.props.children, {
        x: 10,
        y: 20,
        fill: '#ffcccb',
        textAnchor: 'middle',
        children: 10.123
      }));
    });
  });
});
