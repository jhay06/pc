import React from 'react';
import PropTypes from 'prop-types';
import './ContentLabel.css';

export const ContentLabel = ({ label, input }) => (
  <>
    <div
      className={
        ['Remarks', 'Complete Address'].includes(label)
          ? 'content-label col-md-12'
          : 'content-label col-md-6'
      }
    >
      <label>{label}</label>
      <p>{input}</p>
    </div>
  </>
);

export default ContentLabel;

ContentLabel.propTypes = {
  label: PropTypes.string,
  input: PropTypes.string,
};
