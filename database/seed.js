const db  = require('./index.js');
const User = require('./User.js').User;
const userData = require('./User.js').mockData;
const Restaurant = require('./Restaurant.js').Restaurants;
const restaurantData = require('./Restaurant.js').mockData;


// console.log(restaurantData)
const insertData = () => {
  // User.insertMany(userData, err => {
  //   if (err) throw (err);
  // })
  Restaurant.insertMany(restaurantData, err => {
    if (err) throw (err);
    // console.log(restaurantData)
  })
}
insertData();