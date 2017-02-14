require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import RatesDisplay from './RatesDisplayComponent'

class AppComponent extends React.PureComponent {
  render() {
    return (
      <div className="index">
        <RatesDisplay
          base={this.props.params.base}
          compare={this.props.params.compare}
          date={this.props.params.date}
          days={this.props.params.days}
        ></RatesDisplay>
      </div>
    );
  }
}

export default AppComponent;
