import React from "react";
import PropTypes from "prop-types";
import styles from "./RatingBar.css";

const RatingBar = ({ index, filter, scrollToTopOfFeed, percentages }) => {
  if (!percentages.length) {
    return <div id="loading">Loading...</div>;
  }
  return (
    <div
      className="toolbarAndNumber"
      onClick={() => {
        filter(5 - index);
        scrollToTopOfFeed();
      }}
    >
      <div className="toolbarNumber">{5 - index}</div>
      <div className="toolbar-light-background">
        <div
          className="toolbar-red"
          style={{ width: percentages[4 - index] }}
          key={percentages[4 - index]}
        />
      </div>
    </div>
  );
};

export default RatingBar;

RatingBar.propTypes = {
  filter: PropTypes.func.isRequired,
  scrollToTopOfFeed: PropTypes.func.isRequired,
  percentages: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired
};
