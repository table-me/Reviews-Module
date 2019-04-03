const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('./index.js');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const restaurantSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  users: [{
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
}, { _id: false });
restaurantSchema.plugin(AutoIncrement);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;