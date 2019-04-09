import React from 'react';
import PropTypes from 'prop-types';
import FilterBox from './FilterBox.jsx';
import styles from './ReviewToolbar.css';
import UnCheckedIcon from './UnCheckedIcon.jsx';

class ReviewToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ddSelected: false,
      display: 'none',
      current: 'Newest',
      arrow: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/downArrow.png'
    };
  }

  handleSelection(e) {
    const { ddSelected } = this.state;
    const { scrollToTopOfFeed } = this.props;
    this.setState({ ddSelected: !ddSelected });
    e.target.textContent ? this.setState({ current: e.target.textContent }) : null;
    if (!ddSelected) {
      this.setState({ display: 'block' });
      this.setState({ arrow: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/upArrow.png' });
    } else {
      this.setState({ display: 'none' });
      this.setState({ arrow: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/downArrow.png' });
      scrollToTopOfFeed();
    }
  }

  render() {
    const { current, arrow, display } = this.state;
    const { sortReviews, keyWords, filterReviews } = this.props;
    return (
      <div id="toolbarContainer">
        <div id="toolbarSortText">Sort By</div>

        <div id="dropdownHeader" onClick={(e) => this.handleSelection(e)}>
          <span>{current}</span>
          <span><img className="star" src={arrow} /></span>
        </div>
        <div className="dropdownContainer" style={{ display: display }}>
          <div className="dropdownItem" value="Newest" onClick={(e) => {sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e);}} >
            <UnCheckedIcon />
            <span className="dropdownText">Newest</span>
          </div>
          <div className="dropdownItem" value="Highest"onClick={(e) => {sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e);}} >
            <UnCheckedIcon />
            <span className="dropdownText">Highest Rating</span>
          </div>
          <div className="dropdownItem" value="Lowest" onClick={(e) => {sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e);}} >
            <UnCheckedIcon />
            <span className="dropdownText">Lowest Rating</span>
          </div>
        </div>

        <div id="filtersHeader">Filters</div>
        <div>
          {keyWords.map(keyWord => <FilterBox keyWord={keyWord} key={keyWord._id} filterReviews={filterReviews}/>)}
        </div>
      </div>
    );
  }
}
export default ReviewToolbar;

// ReviewToolbar.propTypes = {
//   keyWords: PropTypes.array.isRequired,
//   sortReviews: PropTypes.func.isRequired,
//   filterReviews: PropTypes.func.isRequired,
//   scrollToTopOfFeed: PropTypes.func.isRequired,
// };
