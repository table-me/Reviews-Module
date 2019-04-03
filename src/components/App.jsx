import React from 'react';
import axios from 'axios';
import User from './User.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      restaurant: {},
      users: null
    }
  }

  componentDidMount() {
    axios.get('/api/reviews/233', {
    }).then(response => {
      console.log('success!', response)
      this.setState({restaurant: response.data, users: response.data.users})
    });
  }

  render () {
    return (
      <div className='restaurant-review-container'>
        <div className='restaurant-name'>
          {this.state.restaurant.name}
        </div>
        <div className='reviews-container'>
          {this.state.users === null ? null : this.state.users.map((user) => <User user={user} key={user._id} />)}
        </div>
      </div>
    )
  }
}

export default App;