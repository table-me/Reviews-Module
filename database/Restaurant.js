const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  reviews: [{
    username: String,
    profilePic: String,
    city: String,
    reviews: [{
      review: String,
      createdAt: Date,
      ratings: [{
        overall: Number,
        food: Number,
        ambiance: Number,
        service: Number,
        value: Number
      }]
    }]
  }]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;