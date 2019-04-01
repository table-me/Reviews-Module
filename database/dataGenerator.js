const faker = require('faker');

class Review {
  constructor () {
    this.restaurantName = faker.company.companyName(),
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
  const numberOfReviews = Math.floor(Math.random() * 30 + 1);
  const results = [];
  for (let i = 0; i < numberOfReviews; i++) {
    let review = new Review();
    results.push(review);
  };
  return results;
};

class User {
  constructor() {
    this.username = faker.internet.userName(),
    this.profilePic = faker.internet.avatar(),
    this.city = faker.address.city(),
    this.reviews = makeReview()
  }
};

const makeUser = () => {
  const numberOfUsers = Math.floor(Math.random() * 20 + 1);
  const results = [];
  for (let i = 0; i < numberOfUsers; i++) {
    let user = new User();
    results.push(user);
  };
  return results;
};

const mockData = [];

const createMockData = () => {
  for (let i = 0; i < 101; i++) {
    let restaurant = {
      name: faker.company.companyName(),
      reviews: makeUser()
    };
    mockData.push(restaurant);
  };
};

createMockData();

module.exports.mockData = mockData;