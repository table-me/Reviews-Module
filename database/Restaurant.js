const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const db = require('./index.js');
mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  name: String,
  filters: [],
  reviews: [{
    username: String,
    initials: String,
    profilePic: String,
    city: String,
    review: String,
    createdAt: Date,
    noise: Number,
    foodRating: Number,
    ambianceRating: Number,
    serviceRating: Number,
    valueRating: Number,
    overallRating: Number,
    reviewCount: Number,
    recommended: Number
  }],
});
restaurantSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
