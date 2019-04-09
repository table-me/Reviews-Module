import React from 'react';

const Ratings = ({rating}) => (
  <div className='individual-rating'>
    <div className='overall'>Overall: {rating.overall}</div>
    <div className='food'>Food: {rating.food}</div>
    <div className='service'>Service: {rating.service}</div>
    <div className='ambiance'>Ambiance: {rating.ambiance}</div>
    <div className='value'>Value: {rating.value}</div>
  </div>
);

export default Ratings;
