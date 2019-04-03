import React from 'react';

const Ratings = ({rating}) => (
  <div className='rating'>
    <div className='overall'>Overall: {(rating.food + rating.service + rating.ambiance + rating.value)/4}</div>
    <div className='food'>Food: {rating.food}</div>
    <div className='service'>Service: {rating.service}</div>
    <div className='ambiance'>Ambiance: {rating.ambiance}</div>
    <div className='value'>Value: {rating.value}</div>
  </div>
);

export default Ratings;