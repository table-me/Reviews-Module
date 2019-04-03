import React from 'react';
import Rating from './Rating.jsx'

const User = ({user}) => (
  <div className='review-entry'>
    <div className='user-info'>
      <div className='username'>{user.username}</div>
      <img src={user.profilePic} className='profile-pic'/>
      <div className='city'>{user.city}</div>
      <div className='total-reviews'>{user.reviews.length + ' reviews'}</div>
      <div className='rating'>
        {user.reviews[0].ratings.map(rating => <Rating rating={rating} key={rating._id} />)}
      </div>
      <div className='date'>
        {user.reviews[0].createdAt}
      </div>
      <div className='review'>
        {user.reviews[0].review}
      </div>
    </div>
  </div>
);

export default User;