const mongoose = require('mongoose');
const db = require('./index.js');
const faker = require('faker');
// const Restaurant = require('./Restaurant.js').Restaurants;
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  profilePic: String,
  city: String,
  reviews: [{
    reviewId: String,
    restaurantId: Number,
    review: String,
    ratings: [{
      overall: Number,
      food: Number,
      ambiance: Number,
      service: Number,
      value: Number
    }],
    createdAt: Date
  }]
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

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
    review = new Review();
    results.push(Object.assign({}, review));
  };
  return results;
};

const mockData = [];
const createMockData = () => {
  for (let i = 0; i < 101; i++) {
    let user = {
      username: faker.internet.userName(),
      profilePic: faker.internet.avatar(),
      city: faker.address.city(),
      reviews: makeReview(),
      createdAt: faker.date.past()
    };
    mockData.push(user);
  }
};

createMockData();

module.exports.User = User;
module.exports.mockData = mockData;
