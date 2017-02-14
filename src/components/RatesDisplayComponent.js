import React from 'react';
import {find} from 'lodash';
import RatesStore from '../stores/RatesStore';
import {BarChart, XAxis, YAxis, Bar} from 'recharts';

class RatesDisplayComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ratesStore = new RatesStore();
    this.state = {};
  }

  componentDidMount() {
    this.fetchRates();
  }

  componentDidUpdate(newProps) {
    if (this.havePropsChanged(newProps)) {
      this.fetchRates();
    }
  }

  fetchRates() {
    this.ratesStore.getRates(this.props).then((newRates) => {
      this.setState({rates: newRates});
    });
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

  render() {
    return (
      <div>
        <BarChart width={1000} height={500} data={this.state.rates}>
          <XAxis dataKey="name" />
          <YAxis dataKey="value" domain={['dataMin-0.5', 'dataMax+0.5']} />
          <Bar dataKey="value" fill="#ff0000" />
        </BarChart>
      </div>
    );
  }
}

RatesDisplayComponent.defaultProps = {
  base: 'USD',
  compare: 'EUR',
  date: (new Date()).toISOString().split('T')[0],
  days: 7
}

export default RatesDisplayComponent;
