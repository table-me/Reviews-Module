const db = require("./index.js");
const Restaurant = require("./Restaurant.js");
const mockData = require("./dataGenerator.js");

const insertData = () => {
  Restaurant.create(mockData)
    .then(() => {
      db.close();
      console.log("successfully seeded data!");
    })
    .catch(err => {
      if (err) console.log(err);
    });
};

insertData();
