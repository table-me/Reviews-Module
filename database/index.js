const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true});
const Restaurant = require('./Restaurant.js').Restaurants;
const restaurantData = require('./Restaurant.js').mockData;
 

const insertData = () => {
  Restaurant.create(restaurantData)
  .then(() => mongoose.disconnect())
};

insertData();