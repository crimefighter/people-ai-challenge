import React from 'react';
import {find, mean, round} from 'lodash';
import moment from 'moment';

import RatesStore from '../stores/RatesStore';
import {BarChart, Bar, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import RateBarLabel from './RateBarLabelComponent';

class RatesDisplayComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ratesStore = new RatesStore();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.populateRates();
  }

  componentDidUpdate(newProps) {
    if (this.havePropsChanged(newProps)) {
      this.populateRates();
    }
  }

  populateRates() {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }

    this.ratesStore.getRates(this.props).then((newRates) => {
      let rates = this.normalizeRatesForChart(newRates),
          meanValue = getMeanValue(rates),
          standardDeviation = getStandardDeviation(rates, meanValue);

      this.setState({
        loading: false,
        rates: rates,
        mean: meanValue,
        standardDeviation: standardDeviation
      });
    });

    function getMeanValue(rates) {
      return rates && mean(rates.map((rate) => {
        return rate.value;
      }));
    }

    function getStandardDeviation(rates, meanValue) {
      let squaredDeviations = rates.map((rate) => {
        return Math.pow(meanValue - rate.value, 2);
      });
      return Math.sqrt(mean(squaredDeviations));
    }
  }

  havePropsChanged(oldProps) {
    return find([
      'base',
      'compare',
      'date',
      'days'
    ], (key) => {
      return this.props[key] !== oldProps[key];
    });
  }

  normalizeRatesForChart(rates) {
    return rates.reverse().map((rate) => {
      return Object.assign({}, rate, {
        name: moment(rate.date).format('MMM D'),
        chartValue: rate.value * this.props.scaleFactor
      });
    });
  }

  render() {
    return (
      <div className="text-center chart-container">
        <div className={this.state.loading && 'transparent'}>
          <ResponsiveContainer width="100%" height={500} >
            <BarChart data={this.state.rates}>
              <XAxis dataKey="name" />
              <YAxis
                hide={true}
                dataKey="chartValue"
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <ReferenceLine
                y={this.state.mean * this.props.scaleFactor}
                stroke="#ccc"
                strokeDasharray="3 3"
              />
              <Bar
                dataKey="chartValue"
                fill="#A5C8D3"
                label={<RateBarLabel mean={this.state.mean} />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={this.state.loading && 'hidden'}>
          Median: {round(this.state.mean, 3)}
          &bull;
          Standard Deviation: {round(this.state.standardDeviation, 4)}
        </div>

        {this.state.loading && <div>Loading...</div>}
      </div>
    );
  }
}

RatesDisplayComponent.defaultProps = {
  scaleFactor: 100
};

export default RatesDisplayComponent;
