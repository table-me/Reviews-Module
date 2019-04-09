import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilterBox.css';

class FilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/emptyBox.png',
      redIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redBox.png',
      whiteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/emptyBox.png',
      clicked: false
    };
  }

  switchIcon() {
    this.state.clicked = !this.state.clicked;
    if (this.state.clicked) {
      this.setState({ icon: this.state.redIcon });
    } else {
      this.setState({ icon: this.state.whiteIcon });
      document.activeElement.blur();
    }
  }

  render() {
    const { icon } = this.state;
    const { keyWord: { filterKeyword }, filterReviews } = this.props;
    return (
      <span className="filterCheckBox" tabIndex="0" onClick={() => {this.switchIcon(); filterReviews(filterKeyword);}}>
        <span>
          <img className="filterBoxIcon" src={icon} alt="Box Icon" />
        </span>
        <span> {console.log(filterKeyword)}</span>
      </span>
    );
  }
}
export default FilterBox;

// FilterBox.propTypes = {
//   keyWord: PropTypes.shape({
//     filterKeyword: PropTypes.string.isRequired,
//   }).isRequired,
//   filterReviews: PropTypes.func.isRequired,
// };
