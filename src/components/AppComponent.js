require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {clone, find} from 'lodash';
import RatesDisplay from './RatesDisplayComponent'

class AppComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = clone(this.props.params);
  }

  componentDidUpdate(oldProps) {
    if (this.haveParamsChanged(oldProps)) {
      this.updateState();
    }
  }

  haveParamsChanged(oldProps) {
    return find([
      'base',
      'compare',
      'date',
      'days'
    ], (key) => {
      return this.props.params[key] !== oldProps.params[key];
    });
  }

  updateState() {
    this.setState(clone(this.props.params));
  }

  render() {
    return (
      <div className="index">
        <RatesDisplay
          base={this.state.base}
          compare={this.state.compare}
          date={this.state.date}
          days={this.state.days}
        ></RatesDisplay>
      </div>
    );
  }
}

export default AppComponent;
