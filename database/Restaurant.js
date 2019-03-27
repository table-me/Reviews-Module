const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

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

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;