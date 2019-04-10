import React from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import ReviewSummary from './ReviewSummary.jsx';
import ReviewToolbar from './ReviewToolbar.jsx';
import Pagination from './Pagination.jsx';
import styles from './App.css';

// const getIDFromURL = () => window.location.pathname.split('/')[2]

const getAverage = (reviews, criteria) => {
  let sum = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += reviews[i][criteria];
  }
  return Number.parseFloat(sum / reviews.length).toFixed(1);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      allReviews: [],
      keyWords: [],
      allRatings: [],
      recommended: 0,
      ratings: {
        totalAverage: 0,
        foodAverage: 0,
        serviceAverage: 0,
        ambianceAverage: 0,
        valueAverage: 0,
        noise: 0
      },
      stars: [],
      currentPage: 1,
      totalPages: 1,
      filterWordsSelected: [],
      currentRestReviews: [],
      percentages: Array(5).fill('0%')
    };
  }

  componentDidMount() {
    // const id = getIDFromURL();
    this.pullReviewsById();
    this.pullKeyWordsById();
  } 

  setDynamicStarRating() {
    const { ratings, stars } = this.state;
    let totalAverageCopy = ratings.totalAverage;
    let starsToGo = false;
    for (let i = 0; i < 5; i++) {
      if (totalAverageCopy - 1 < 0 && !starsToGo) {
        (totalAverageCopy < .5) ? stars.push('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/lowStar.png') : stars.push('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/highStar.png');
        totalAverageCopy--;
        starsToGo = true;
      } else {
        totalAverageCopy > .5 ? stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png") : stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/greyStar.png");
        totalAverageCopy--;
      }
    }
    this.setState({ stars });
  }  

  pullReviewsById(id) {
    axios.get(`/restaurant/101/reviews`)
      .then(res => {
        const rating = [];
        for (let i = 0; i < res.data.length; i++) {
          rating.push(res.data[i].overallRating);
        }

        this.setState({
          allReviews: res.data,
          reviews: res.data.slice(0, 20),
          totalPages: Math.round(res.data.length / 20),
          currentRestReviews: res.data,
          allRatings: rating,
          recommended: res.data[0].recommended,
          ratings: {
            totalAverage: getAverage(res.data, 'overallRating'),
            foodAverage: getAverage(res.data, 'foodRating'),
            serviceAverage: getAverage(res.data, 'serviceRating'),
            ambianceAverage: getAverage(res.data, 'ambianceRating'),
            valueAverage: getAverage(res.data, 'valueRating'),
            noise: getAverage(res.data, 'noise')
          }
        }, () => {
          this.setDynamicStarRating();
          this.getRatingPercentages();
        });
      })
      .catch(err => console.log(err));
  }

  getRatingPercentages() {
    const { allRatings} = this.state;

    let fiveStarCount = 0;
    let fourStarCount = 0;
    let threeStarCount = 0;
    let twoStarCount = 0;
    let oneStarCount = 0;

    for (let i = 0; i < allRatings.length; i++) {
      const rating = Math.floor(allRatings[i]);
      if (rating === 1) oneStarCount++;
      if (rating === 2) twoStarCount++;
      if (rating === 3) threeStarCount++;
      if (rating === 4) fourStarCount++;
      if (rating === 5) fiveStarCount++;
    }
    const counts = [fiveStarCount, fourStarCount, threeStarCount, twoStarCount, oneStarCount]
    this.setState({ percentages: counts.map(count => Math.round(count / allRatings.length * 100) + '%') })
  }

  pullKeyWordsById(id) {
    axios.get(`/restaurant/101/filters`)
      .then((res) => {
        this.setState({ keyWords: res.data });
      })
      .catch(err => console.log(err));
  }

  filterReviewsByKeyWord(target) {
    let { allReviews, filterWordsSelected, currentRestReviews } = this.state;
    const targetIndex = filterWordsSelected.indexOf(target)
    if (targetIndex !== -1) {
      filterWordsSelected.splice(targetIndex, 1)
      currentRestReviews = allReviews;
    } else {
      filterWordsSelected.push(target);
    }

    if (!filterWordsSelected.length) {
      this.setState({
        reviews: allReviews.slice(0, 20),
        currentRestReviews: allReviews,
        totalPages: Math.round(currentRestReviews.length / 20), currentPage: 1 
      });
    } else {
      let filtered = [];
      for (let i = 0; i < filterWordsSelected.length; i++) {
        filtered = currentRestReviews.filter(review => review.review.includes(filterWordsSelected[i]));
        currentRestReviews = filtered;
      }
      this.setState({ reviews: filtered.slice(0, 20), currentRestReviews: filtered });
      this.setState({ totalPages: Math.round(filtered.length / 20), currentPage: 1 });
    }
  }

  filterReviewsByRating(target) {
    const { allReviews } = this.state;
    const filtered = allReviews.filter(review => review.overallRating === target);
    this.setState({
      reviews: filtered.slice(0, 20),
      currentRestReviews: filtered,
      totalPages: Math.round(filtered.length / 20),
      currentPage: 1
    });
  }

  sortReviewsBySelect(sortMethod) {
    let { currentRestReviews, allReviews } = this.state;
    if (sortMethod === 'Highest') {
      currentRestReviews = allReviews.sort((a, b) => b.overallRating - a.overallRating);
    } else if (sortMethod === 'Lowest') {
      currentRestReviews = allReviews.sort((a, b) => a.overallRating - b.overallRating);
    } else {
      currentRestReviews = allReviews.sort((a, b) => b.dinedDate - a.dinedDate);
    }
    this.setState({ 
      reviews: currentRestReviews.slice(0, 20),
      currentRestReviews: currentRestReviews,
    });
  }

  handlePageChange(page) {
    const { currentRestReviews } = this.state;
    this.setState({
      reviews: currentRestReviews.slice((page - 1) * 20, page * 20),
      currentPage: page
    });
  }

  scrollToTopOfFeed() {
    document.getElementById('reviewContainer').scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { reviews, allReviews, recommended, ratings, stars, keyWords, currentPage, totalPages, percentages } = this.state;

    if (!reviews.length) {
      return <h3>Loading...</h3>
    }

    return (
      <div id="appMasterContainer">
        { <ReviewSummary
          allReviews={allReviews}
          ratings={ratings}
          stars={stars}
          filter={this.filterReviewsByRating.bind(this)}
          scrollToTopOfFeed={this.scrollToTopOfFeed.bind(this)}
          percentages={percentages}
          recommended={recommended}
        /> }

        { <ReviewToolbar
          keyWords={keyWords}
          sortReviews={this.sortReviewsBySelect.bind(this)}
          filterReviews={this.filterReviewsByKeyWord.bind(this)}
          scrollToTopOfFeed={this.scrollToTopOfFeed.bind(this)}
        /> }

        { <ReviewList
          reviews={reviews}
          key={reviews._id}
        /> }

        <Pagination
          reviews={allReviews}
          handlePageChange={this.handlePageChange.bind(this)}
          currentPage={currentPage}
          totalPages={totalPages}
          scrollToTopOfFeed={this.scrollToTopOfFeed.bind(this)}
        />
      </div>
    );
  }
}

export default App;
