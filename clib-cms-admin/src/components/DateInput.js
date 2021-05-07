import React from 'react';
import PropTypes from 'prop-types';
import './InputGroup.css';

export const DateInput = ({ label }) => (
  <div className="input-group col-md-6 col-sm-12">
    <label>{label}</label>
    <input type="date"></input>
  </div>
);

export default DateInput;

DateInput.propTypes = {
  label: PropTypes.string,
};
