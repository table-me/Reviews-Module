const mongoose = require('mongoose');
const db = require('./index.js');
const faker = require('faker');
mongoose.Promise = global.Promise;


const restaurantSchema = new mongoose.Schema({
  name: String,
  users: [{
    username: String,
    profilePic: String,
    city: String
  }],
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
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

class User {
  constructor() {
    this.username = faker.internet.userName(),
    this.profilePic = faker.internet.avatar(),
    this.city = faker.address.city()
  }
};

const makeUser = () => {
  let n = Math.floor(Math.random() * 40 + 1);
  let results = [];
  for (let i = 0; i < n; i++) {
    let user = new User();
    results.push(Object.assign({}, user));
  };
  return results;
};

class Review {
  constructor () {
    this.review = faker.lorem.sentences(),
    this.createdAt = faker.date.past(),
    this.ratings = {
      food: Math.floor(Math.random() * 5 + 1),
      ambiance: Math.floor(Math.random() * 5 + 1),
      service: Math.floor(Math.random() * 5 + 1),
      value: Math.floor(Math.random() * 5 + 1)
    }
  }
};

const makeReview = () => {
  let n = Math.floor(Math.random() * 50 + 1);
  let results = [];
  for (let i = 0; i < n; i++) {
    let review = new Review();
    results.push(Object.assign({}, review));
  };
  return results;
};

const mockData = [];
const createMockData = () => {
  for (let i = 0; i < 101; i++) {
    let restaurant = {
      name: faker.company.companyName(),
      users: makeUser(),
      reviews: makeReview()
    };
    mockData.push(restaurant);
  };
};

createMockData();

module.exports.Restaurants = Restaurant;
module.exports.mockData = mockData;