const db = require('./index.js');
const Restaurant = require('./Restaurant.js');
const mockData = require('./dataGenerator.js');

const insertData = () => {
  Restaurant.create(mockData)
  .then((err) => {if (err) throw (err); console.log('successfully seeded data!')});
};

insertData();