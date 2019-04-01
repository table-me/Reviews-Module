const db = require('./index.js');
const Restaurant = require('./Restaurant.js');
const restaurantData = require('./dataGenerator.js').mockData;
 

const insertData = () => {
  Restaurant.create(restaurantData)
  .then(() => console.log('successfully seeded data!'));
};

insertData();