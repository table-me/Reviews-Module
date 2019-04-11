import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReportPopUp.css';

class ReportPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown, false)
  }

  handleMouseDown(e) {
    const { outsideClick } = this.props;
    outsideClick(e);
  }

  render() {
    const { setNode, toggleReportModal } = this.props;
    return (
      <div id="modalContainer">
        <div className="modalBackground">
          <div className="modalContent" ref={node => setNode(node)}>
            <div id="reviewReport">
              <div id="reportHeadContainer">
                <div id="reportHeadText"><strong>Report this review as inappropriate?</strong></div>
              </div>
              <div id="reportBodyContainer">
                <div id="reportBodyText"><strong>If you believe this review should be removed from OpenTable, please let us know and someone will investigate.</strong></div>
                <form>
                  <input type="hidden" />
                  <textarea id="reviewReasonText" placeholder="Tell us why you find the review inappropriate." required="required" />
                  <div id="reportButtonsContainer">
                    <button id="reportConfirm" type="submit" onClick={e => toggleReportModal(e)}>Report</button>
                    <button id="reportCancel" type="button" onClick={e => toggleReportModal(e)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ReportPopUp;

ReportPopUp.propTypes = {
  setNode: PropTypes.func.isRequired,
  toggleReportModal: PropTypes.func.isRequired,
  outsideClick: PropTypes.func.isRequired,
};
