import React from 'react';
import PropTypes from 'prop-types';
import './Text.css';

export const Text = ({ text, type }) => (
  <>
    <p className={`text-${type}`}>{text}</p>
  </>
);

export default Text;

Text.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  dataType: PropTypes.string,
};
