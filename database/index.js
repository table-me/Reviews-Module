const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: String,
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
});

const restaurantSchema = new mongoose.Schema({
  _id: String,
  totalReviews: Number,
  stars: {
    five: [String],
    four: [String],
    three: [String],
    two: [String],
    one: [String]
  },
  ratings: {
    overall: Number,
    food: Number,
    ambiance: Number,
    service: Number,
    value: Number
  }
});