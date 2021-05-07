import React from 'react';
import PropTypes from 'prop-types';

import './ErrorMessage.css';

export const ErrorMessage = ({ icon, meta }) => {
  return (
    <>
      <div className="error-message">
        <ion-icon name={icon}></ion-icon>
        <h5>{meta}</h5>
      </div>
    </>
  );
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  icon: PropTypes.string,
  meta: PropTypes.string,
};
