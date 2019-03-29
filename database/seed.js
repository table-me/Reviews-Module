const db = require('./index.js');
const Restaurant = require('./Restaurant.js').Restaurant;
const restaurantData = require('./Restaurant.js').mockData;
 

const insertData = () => {
  Restaurant.create(restaurantData);
};

insertData();