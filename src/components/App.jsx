import React from 'react';
import axios from 'axios';
import { Dropdown } from 'reactjs-dropdown-component';
import User from './User.jsx';
// import RestaurantRating from './Restaurant.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      users: [],
      reviews: {}
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get(`/api/reviews/233`).then(response => {
      console.log('response data', response.data.users[0].reviews[0])
      this.setState({ restaurant: response.data, users: response.data.users, reviews: response.data.users.reviews });
    });
  }

  resetThenSet (id, key) {
    let temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    });
  }

  render() {
    if (!this.state.users && !this.state.reviews) {
      return null;
    }
    return (
      <div className="restaurant-review-container">
        <div className="restaurant-name">{this.state.restaurant.name}</div>
        <div className="restaurant-rating">
          <Dropdown title="Newest" list={this.state.users} resetThenSet={this.resetThenSet} />
          <div className="total-restaurant-reviews">{this.state.users.length + ' reviews'}</div>
        </div>
        <div className="reviews-container">
          {this.state.users.map((user) => <User user={user} />)}
        </div>
      </div>
    );
  }
}

export default App;
