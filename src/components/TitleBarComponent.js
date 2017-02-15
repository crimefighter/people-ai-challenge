import React from 'react';
import moment from 'moment';

class TitleBarComponent extends React.PureComponent {
  getFromDateString() {
    return moment(this.props.date).startOf('day')
      .subtract(this.props.days, 'days')
      .format('MMM D YYYY');
  }

  getToDateString() {
    return moment(this.props.date).format('MMM D YYYY');
  }

  render() {
    return (
      <h1 className="text-center">
        {this.props.base}/{this.props.compare} Exchange Rates from {this.getFromDateString()} to {this.getToDateString()}
      </h1>
    );
  }
}

export default TitleBarComponent;
