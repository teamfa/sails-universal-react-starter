import React, { PropTypes } from 'react';
import withStyles from 'withStyles';
import s from './home.scss';

const propTypes = {
};

function Home() {
    console.log('home')
  return (
    <div className={s.root}>
      Home Page Content
    </div>
  );
}

Home.propTypes = propTypes;
export default withStyles(Home, s);
