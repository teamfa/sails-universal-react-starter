import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

export default (
  <Router history={browserHistory}>
    <Route path="/" name="home" component={require('./layout.js')}>
      <IndexRoute name="home" component={require('./pages/home.js')} />
      <Route name="articles" path="articles" component={require('./pages/articles.js')} />
      <Route path="*" name="home" component={require('./pages/404.js')} />
    </Route>
  </Router>
);
