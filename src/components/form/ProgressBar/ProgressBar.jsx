import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar.bs';

export default function ProgressBarComponent({ percent, percentNumber }) {
  return (
    <ProgressBar percent={percent} percentNumber={percentNumber}/>
  );
}

ProgressBarComponent.propTypes = {
  /**
   * Percent of progress made
   */
  percent: PropTypes.string.isRequired,
  percentNumber: PropTypes.number.isRequired,

};
