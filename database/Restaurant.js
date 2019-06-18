const mongoose = require("mongoose");
const db = require("./index.js");
mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  filters: [],
  reviews: [
    {
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
    }
  ]
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
