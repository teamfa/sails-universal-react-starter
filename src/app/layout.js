import React, { PropTypes } from 'react';
import Nav from './partials/nav.js';
import Normalise from 'styles/normalise.css';
import withStyles from 'withStyles';

const propTypes = {
  children: PropTypes.element.isRequired,
  route: PropTypes.object.isRequired,
};

function Layout({ route, children }) {
  if (__CLIENT__ && route && route.name) {
    document.title = route.name.charAt(0).toUpperCase() + route.name.substr(1);
  }

  return (
    <div>
      <img alt="TeamFA Logo" width="120" height="65" src={require('images/teamfa.png')} />
      <Nav />
      {children}
    </div>
  );
}

Layout.propTypes = propTypes;
export default withStyles(Layout, Normalise);
