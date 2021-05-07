import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './ClaimModalLoading.css';
import PropTypes from 'prop-types';

export const ClaimModalLoading = ({ progPercent, message }) => {
  return (
    <>
      <div className="loading-page">
        <div className="loading-container d-flex flex-column align-items-center">
          <div className="spinner">
            <div className="breaker"></div>
          </div>
          <ProgressBar now={progPercent} />
          <h5>{message}</h5>
        </div>
      </div>
    </>
  );
};

export default ClaimModalLoading;

ClaimModalLoading.propTypes = {
  progPercent: PropTypes.number,
  message: PropTypes.string,
};
