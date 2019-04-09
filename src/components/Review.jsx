import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReportPopUp from './ReportPopUp.jsx';
import moment from 'moment';
import styles from './Review.css';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveronHelp: false,
      helpful: false,
      upvoteIcon: this.props.review.is_helpful ? 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' : 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/whiteUpvote.png',
      readMoreClicked: false,
      reviewText: this.props.review.review.slice(0, 200),
      stars: [],
      reportClicked: false,
      reportPopUp: '',
      randomColor: '#ffffff'
    };
  }

  componentDidMount() {
    const { review } = this.props;
    this.setStars();
    this.setColor();
    if (review.is_helpful) this.setState({ helpful: true });
    if (review.review.length > 200);
    this.setState({ reviewText: review.review.slice(0, 200) + '...' });
  }

  setStars() {
    const { review } = this.props;
    const { stars } = this.state;
    let initialRating = review.overallRating;
    for (let i = 0; i < 5; i++) {
      initialRating > 0.5
        ? stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png") 
        : stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/greyStar.png");
      initialRating--;
    }
    this.setState({ stars });
  }

  setColor() {
    const circleColors = ['#df4e96', '#bb6acd', '#6c8ae4', '#d86441'];
    this.setState({ randomColor: circleColors[Math.floor(Math.random() * circleColors.length)] });
  }

  setNode(node) {
    this.node = node;
  }

  helpfulClick() {
    const { review } = this.props;
    const { helpful } = this.state;
    this.setState({ helpful: !helpful });
    helpful
      ? this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' }) 
      : this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/whiteUpvote.png' });
    review.is_helpful ? review.is_helpful = 0 : review.is_helpful = 1;
    axios.post(`http://ec2-34-207-216-56.compute-1.amazonaws.com/restaurant/${review.is_helpful}/id/${review._id}/helpfulEvent`)
      .catch(err => console.error(err));
  }

  readMoreToggle(e) {
    const { review } = this.props;
    const { reviewText } = this.state;
    e.preventDefault();
    this.setState(prevState => ({ readMoreClicked: !prevState.readMoreClicked}));
    (reviewText.length < 305)
      ? this.setState({ reviewText: review.review }) 
      : this.setState({ reviewText: review.review.slice(0, 200) + '...' });
  }

  toggleReportModal() {
    const { reportClicked } = this.state;
    this.setState({ reportClicked: !reportClicked }, () => this.reportPopUp());
  }

  handleOutsideClick(e) {
    if (this.node && this.node.contains(e.target)) return;
    this.setState({ reportClicked: false }, () => this.reportPopUp());
  }

  reportPopUp() {
    const { reportClicked } = this.state;
    this.setState({ reportPopUp: (reportClicked
      ? (
        <ReportPopUp 
          setNode={this.setNode.bind(this)} 
          outsideClick={this.handleOutsideClick.bind(this)}
          toggleReportModal={this.toggleReportModal.bind(this)}/>
      )
      : '')
    });
  }

  render() {
    const { review } = this.props;
    const { hoveronHelp, readMoreClicked, reportPopUp, randomColor, stars, reviewText, upvoteIcon, helpful } = this.state;
    const helpHover = (hoveronHelp ? 'helpHovered' : 'placeholder');
    let readMorePhrase = (readMoreClicked ? '- Read less' : '+ Read more');
    if (!readMoreClicked && review.review.length < 200) readMorePhrase = '';
    const reviewPluralCase = (review.reviewCount === 1 ? 'review' : 'reviews');

    return (
      <div id="reviewContainer">
        {reportPopUp}
        <div className="twoHalvesContainer">

          <div className="leftHalf" id="reviewLeftHalf">
            <div id="reviewCircleContainer">
              <div className="authorCircle" style={{ backgroundColor: randomColor }}></div>
            </div>
            <div id="usernameContainer">
              <span>
                <span id="reviewUsername">{review.username}</span>
              </span>
            </div>
            <span id="userCity">{review.city}</span>
            <div id="userReviewsContainer">
              <span className="commentIcon" />
              <span id="reviewCountText">&nbsp; {review.reviewCount} {reviewPluralCase}</span>
            </div>
          </div>

          <div className="rightHalf" id="reviewRightHalf">

            <div id="reviewStarsDateRating">
              <div id="reviewStarsDate">
                <div id="reviewStarsContainer">
                  {stars.map(star => <img className="reviewStar" src={star} alt="Star Icon" />)}
                </div>
                <span className="reviewRatingDate"> Dined on {moment(review.createdAt).format('MMMM Do, YYYY')}</span>
              </div>
              <div id="reviewRatingsContainer">
                <span className="reviewRatingCategory">Overall </span>
                <span className="reviewRatingNumber">{review.overallRating} &nbsp;</span>
                <span className="reviewRatingCategory">&#8226; Food </span>
                <span className="reviewRatingNumber">{review.foodRating} &nbsp;</span>
                <span className="reviewRatingCategory">&#8226; Service </span>
                <span className="reviewRatingNumber">{review.serviceRating} &nbsp;</span>
                <span className="reviewRatingCategory">&#8226; Ambiance </span>
                <span className="reviewRatingNumber">{review.ambianceRating}</span>
              </div>
            </div>

            <div>
              <p id="reviewText">{reviewText}</p>
            </div>

            <div id="reportHelpful">
              <div>
                <a id="readMore" href="#" onClick={(e) => this.readMoreToggle(e)}>{readMorePhrase}</a>
              </div>
              <div id="subReportHelpful">
                <div className="flexCenter" id="reportContainer" onClick={(e) => this.toggleReportModal(e)}>
                  <div id="flagIcon" />
                  <span className="reportText">Report</span>
                </div>
                <div className="flexCenter"
                  id={helpHover} 
                  value={review.is_helpful}
                  onClick={() => this.helpfulClick(review.is_helpful)} 
                  onMouseOver={() => this.setState({ hoveronHelp: true, upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' })} 
                  onMouseLeave={() => {
                    this.setState({ hoveronHelp: false });
                    helpful ? this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' }) : this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/whiteUpvote.png' });
                  }}>
                  <div className="flex" >
                    <img id="upvoteIcon" src={upvoteIcon} alt="upvote Icon" />
                  </div>
                  <span className="reportText">Helpful {helpful ? '(1)' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Review;

// Review.propTypes = {
//   review: PropTypes.shape({
//     is_helpful: PropTypes.number.isRequired,
//     ambianceRating: PropTypes.number.isRequired,
//     serviceRating: PropTypes.number.isRequired,
//     foodRating: PropTypes.number.isRequired,
//     overallRating: PropTypes.number.isRequired,
//     dinedDate: PropTypes.string.isRequired,
//     is_recommended: PropTypes.number.isRequired,
//     _id: PropTypes.number.isRequired,
//     noise: PropTypes.number.isRequired,
//     reviewText: PropTypes.string.isRequired,
//     userName: PropTypes.string.isRequired,
//     userReviewCount: PropTypes.number.isRequired,
//   }).isRequired,
// };
