import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './LoadingPage.css';

export const LoadingPage = () => {
  return (
    <>
      <div className="loading-page">
        <div className="loading-container d-flex flex-column align-items-center">
          <div className="spinner">
            <div className="breaker"></div>
          </div>
          <ProgressBar now={60} />

          <h5>Please wait while the application is loading.</h5>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
