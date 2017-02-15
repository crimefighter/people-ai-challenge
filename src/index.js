import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/AppComponent';
import { Router, Route, hashHistory } from 'react-router';

// Render the main component into the dom
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/(:base)(/:compare)" component={App}>
    </Route>
  </Router>
), document.getElementById('app'));
