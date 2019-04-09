import React from 'react';
import Review from './Review.jsx';
import PropTypes from 'prop-types';

const ReviewList = ({ reviews }) => (
  <div id="reviewsContainer">
    {reviews.map(review => <Review review={review} key={review._id} />)}
  </div>
);

export default ReviewList;

// ReviewList.propTypes = {
//   reviews: PropTypes.array.isRequired,
// };
