import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import Layout from './layout';
import Home from './pages/home';
import Articles from './pages/articles';
import NotFound from './pages/404';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="articles" component={Articles} routingPreference="sails" />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
