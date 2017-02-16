import React from 'react';
import {find, round, sortBy} from 'lodash';
import moment from 'moment';
import {Link} from 'react-router';

import RatesStore from '../stores/RatesStore';
import RateCalculationsStore from '../stores/RateCalculationsStore';

import {BarChart, Bar, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import RateBarLabel from './RateBarLabelComponent';

class RatesDisplayComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.ratesStore = new RatesStore();
    this.rateCalculations = new RateCalculationsStore();

    this.state = {
      loading: true,
      error: false
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

    this.ratesStore.getRates(this.props).then(
      (newRates) => {
        let rates = this.normalizeRatesForChart(newRates),
            meanValue = this.rateCalculations.getMeanValue(rates),
            standardDeviation = this.rateCalculations.getStandardDeviation(rates, meanValue);

        this.setState({
          loading: false,
          error: false,
          rates: rates,
          mean: meanValue,
          standardDeviation: standardDeviation
        });
      },
      (error) => {
        this.setState({
          loading: false,
          error: error
        });
      }
    );
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
    return sortBy(rates, 'date').map((rate) => {
      return Object.assign({}, rate, {
        name: moment(rate.date).format('MMM D'),
        chartValue: rate.value * this.props.scaleFactor
      });
    });
  }

  render() {
    return (
      <div className="text-center chart-container">
        <div className={this.state.loading || this.state.error ? 'transparent' : ''}>
          <ResponsiveContainer width="100%" height={500} minWidth={this.props.days * 50}>
            <BarChart data={this.state.rates}>
              <XAxis dataKey="name" />
              <YAxis
                hide={true}
                dataKey="chartValue"
                domain={['dataMin - 1', 'dataMax + 1']}
                padding={{top: 40}}
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

        <div className={this.state.loading || this.state.error ? 'legend hidden' : 'legend text-light-gray'}>
          Median: {round(this.state.mean, 3)}
          &nbsp;&bull;
          Standard Deviation: {round(this.state.standardDeviation, 4)}
        </div>

        {this.state.loading && <div>Loading...</div>}
        {!this.state.loading && this.state.error && (
          <div className="text-error">
            Error retrieving data. <Link to="/">Reset</Link>
          </div>
        )}
      </div>
    );
  }
}

RatesDisplayComponent.defaultProps = {
  scaleFactor: 100
};

export default RatesDisplayComponent;
