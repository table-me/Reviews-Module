const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: String,
  profilePic: String,
  city: String,
  totalReviews: Number,
  reviews: {
    reviewId: String,
    restaurantId: Number,
    review: String,
    ratings: {
      overall: Number,
      food: Number,
      ambiance: Number,
      service: Number,
      value: Number
    },
    createdAt: Date
  }
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;