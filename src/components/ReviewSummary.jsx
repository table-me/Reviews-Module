import React from "react";
import PropTypes from "prop-types";
import RatingBar from "./RatingBar.jsx";
import styles from "./ReviewSummary.css";

const ReviewSummary = ({
  ratings,
  recommended,
  allReviews,
  stars,
  filter,
  scrollToTopOfFeed,
  percentages
}) => {
  let noiseLevel;
  if (ratings.noise > 2) {
    noiseLevel = "Loud";
  } else if (ratings.noise < 2 && ratings.noise > 1) {
    noiseLevel = "Moderate";
  } else {
    noiseLevel = "Quiet";
  }
  if (!percentages.length) {
    return <div>Please wait</div>;
  }
  const starSource = stars ? stars : Array(5).fill("");
  return (
    <div id="reviewSummaryContainer">
      <div className="summaryHeader">
        What {allReviews.length} People Are Saying
      </div>
      <div id="summaryContainer">
        <div id="leftSummaryContainer">
          <div className="summarySubHeader">
            <span>Overall ratings and reviews</span>
          </div>
          <div id="reviewConditional">
            Reviews can only be made by diners who <br />
            have eaten at this restaurant
          </div>
          <div>
            <div className="summaryStarRating">
              {stars.map((star, i) => (
                <span>
                  <img
                    className="summaryStarIcon"
                    src={starSource[i]}
                    alt="Star Icon"
                  />
                </span>
              ))}
            </div>
            <div className="summaryStarRating" id="summaryStarText">
              <span> &nbsp; {ratings.totalAverage} &nbsp;</span>
              <span> based on recent ratings</span>
            </div>
          </div>
          <div className="summaryRatingContainer">
            <div className="summaryRating" id="summaryFirstRating">
              <div>
                <strong>{ratings.foodAverage}</strong>
              </div>
              <div className="summaryCategory">Food</div>
            </div>
            <div className="summaryRating">
              <div>
                <strong>{ratings.serviceAverage}</strong>
              </div>
              <div className="summaryCategory">Service</div>
            </div>
            <div className="summaryRating">
              <div>
                <strong>{ratings.ambianceAverage}</strong>
              </div>
              <div className="summaryCategory">Ambience</div>
            </div>
            <div className="summaryRating">
              <div>
                <strong>{ratings.valueAverage}</strong>
              </div>
              <div className="summaryCategory">Value</div>
            </div>
          </div>
          <div className="summarySpacingContainer">
            <div className="inlineBlock">
              <span>
                <img
                  className="summaryIcon"
                  id="summaryBarIcon"
                  src="https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/risingBars.png"
                  alt="bar icon"
                />
              </span>
              <span id="summaryNoiseText">
                <strong>Noise &#8226;</strong>
                <span id="summaryNoiseLevel"> {noiseLevel}</span>
              </span>
            </div>
          </div>
          <div className="summarySpacingContainer">
            <div className="inlineBlock">
              <span>
                <img
                  className="summaryIcon"
                  id="thumbsUpIcon"
                  src="https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/thumbsUp.png"
                  alt="thumbsUp icon"
                />
              </span>
              <span id="recommendedText">
                <strong>{recommended}% of people</strong>{" "}
                <span>would recommend it to a friend</span>
              </span>
            </div>
          </div>
        </div>

        <div id="summaryToolbarContainer">
          <div id="toolbar">
            {percentages.map((bar, index) => (
              <div
                className="toolbarAndNumber"
                onClick={() => {
                  filter(5 - index);
                  scrollToTopOfFeed();
                }}
              >
                <div className="toolbarNumber">{5 - index}</div>
                <div className="toolbar-light-background">
                  <div
                    className="toolbar-red"
                    style={{ width: percentages[4 - index] }}
                    key={percentages[4 - index]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <a id="BestRestaurantsLink" href="#">
          Best Restaurants in San Francisco
        </a>
      </div>
    </div>
  );
};

export default ReviewSummary;

ReviewSummary.propTypes = {
  filter: PropTypes.func.isRequired,
  scrollToTopOfFeed: PropTypes.func.isRequired,
  allReviews: PropTypes.array.isRequired,
  stars: PropTypes.array.isRequired,
  ratings: PropTypes.object.isRequired,
  percentages: PropTypes.array.isRequired
};
