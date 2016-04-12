import React, { PropTypes } from 'react';
import withStyles from 'withStyles';
import s from './404.scss';

const propTypes = {
};

function NotFound() {
  return (
    <div className={s.root}>
      404 Not Found
    </div>
  );
}

NotFound.propTypes = propTypes;
export default withStyles(NotFound, s);
