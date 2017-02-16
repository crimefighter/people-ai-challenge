require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {defaults, get} from 'lodash';

import config from 'config';
import RatesDisplay from './RatesDisplayComponent'
import TitleBar from './TitleBarComponent';
import NavigationBar from './NavigationBarComponent';

class AppComponent extends React.PureComponent {
  render() {
    let params = Object.assign({},
      get(this.props, 'location.query', {}),
      this.props.params
    );

    defaults(params, config.defaults);

    return (
      <div className="index">
        <TitleBar
          base={params.base}
          compare={params.compare}
          date={params.date}
          days={params.days}
        />
        <NavigationBar
          base={params.base}
          compare={params.compare}
          date={params.date}
          days={params.days}
        />
        <RatesDisplay
          base={params.base}
          compare={params.compare}
          date={params.date}
          days={params.days}
        ></RatesDisplay>
      </div>
    );
  }
}

export default AppComponent;
