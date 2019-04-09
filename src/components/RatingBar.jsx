import React from 'react';
import PropTypes from 'prop-types';
import styles from './RatingBar.css';

const RatingBar = ({ index, filter, scrollToTopOfFeed, percentages }) => {
  if (!percentages.length) {
    return <div>Loading...</div>;
  }
  return (
      <div className="toolbarAndNumber" onClick={() => {filter(5 - index); scrollToTopOfFeed();}}>
      <span className="toolbarNumber">{console.log('index', index)}</span>
      <div className="toolbar-light-background">
        <div className="toolbar-red" style={{ width: percentages[4 - index] }} key={percentages[4 - index]} />
      </div>
      </div>
  )
}

export default RatingBar;

// RatingBar.propTypes = {
//     filter: PropTypes.func.isRequired,
//     scrollToTopOfFeed: PropTypes.func.isRequired,
//     percentages: PropTypes.array.isRequired,
//     i: PropTypes.number.isRequired,
// };