/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

const faker = require('faker');

class Review {
  constructor() {
    this.username = faker.internet.userName(),
    this.profilePic = faker.internet.avatar(),
    this.city = faker.address.city(),
    this.review = faker.lorem.sentences(),
    this.noise = Math.floor(Math.random() * 3 + 1),
    this.createdAt = new Date(faker.date.past()),
    this.foodRating = Math.floor(Math.random() * 5 + 1),
    this.ambianceRating = Math.floor(Math.random() * 5 + 1),
    this.serviceRating = Math.floor(Math.random() * 5 + 1),
    this.valueRating = Math.floor(Math.random() * 5 + 1),
    this.overallRating = (this.foodRating + this.ambianceRating + this.serviceRating + this.valueRating)/4,
    this.reviewCount = Math.floor(Math.random() * 50)
  }
}

const makeReview = () => {
  const numberOfReviews = Math.floor(Math.random() * 200 + 1);
  const results = [];
  for (let i = 0; i < numberOfReviews; i++) {
    const review = new Review();
    results.push(review);
  }
  return results;
};

const filterWords = () => {
  const randomWords = [];
  const filterKeyWordCount = Math.random() * 5;
  for (let j = 0; j < filterKeyWordCount; j++) {
    randomWords.push(faker.lorem.paragraph().split(' ')[2]);
  }
  return randomWords;
};

const mockData = [];

const createMockData = () => {
  for (let i = 0; i < 101; i++) {
    const restaurant = {
      name: faker.company.companyName(),
      reviews: makeReview(),
      filters: filterWords()
    };
    mockData.push(restaurant);
  }
};

createMockData();

module.exports = mockData;
