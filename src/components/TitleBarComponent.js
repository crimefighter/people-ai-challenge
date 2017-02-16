import React from 'react';
import moment from 'moment';

import config from 'config';

class TitleBarComponent extends React.PureComponent {
  getFromDateString() {
    return moment(this.props.date).startOf('day')
      .subtract(this.props.days, 'days')
      .format(this.props.dateFormat);
  }

  getToDateString() {
    return moment(this.props.date).format(this.props.dateFormat);
  }

  render() {
    return (
      <h1 className="text-center">
        {this.props.base}/{this.props.compare} Exchange Rates from {this.getFromDateString()} to {this.getToDateString()}
      </h1>
    );
  }
}

TitleBarComponent.defaultProps = {
  dateFormat: config.dateFormats.title
};

export default TitleBarComponent;
