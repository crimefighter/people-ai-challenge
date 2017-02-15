require('react-datepicker/dist/react-datepicker.css');

import React from 'react';
import {hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class NavigationBarComponent extends React.Component {
  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.navigate(newState);
  }

  handleDateChange(newDate) {
    let todayMoment = moment().startOf('day');
    if (newDate.startOf('day') > todayMoment) {
      newDate = todayMoment;
    }
    this.navigate({
      date: newDate.format('YYYY-MM-DD')
    });
  }

  switchCurrencies() {
    this.navigate({
      base: this.props.compare,
      compare: this.props.base
    });
  }

  buildHash(newState) {
    let state = Object.assign({}, this.props, newState);
    return {
      pathname: [
        '/', state.base,
        '/', state.compare
      ].join(''),
      query: {
        days: state.days,
        date: state.date
      }
    };
  }

  navigate(newState) {
    hashHistory.push(this.buildHash(newState));
  }

  render() {
    return (
      <div className="navigation-bar text-center">
        <select name="base" value={this.props.base} onChange={this.handleChange.bind(this)}>
          {this.props.currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button onClick={this.switchCurrencies.bind(this)}>/</button>
        <select name="compare" value={this.props.compare} onChange={this.handleChange.bind(this)}>
          {this.props.currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <label for="date">Date:</label>
        <DatePicker name="date" selected={moment(this.props.date)} onChange={this.handleDateChange.bind(this)} />
        <label for="days">Look back:</label>
        <select name="days" value={this.props.days} onChange={this.handleChange.bind(this)}>
          {[7, 14, 21, 28].map(days => (
            <option key={days} value={days}>{days} days</option>
          ))}
        </select>
      </div>
    );
  }
}

export default NavigationBarComponent;
