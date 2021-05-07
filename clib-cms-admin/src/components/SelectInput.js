import React from 'react';
import PropTypes from 'prop-types';
import './InputGroup.css';

const SelectInput = ({
  name,
  label,
  value,
  options,
  onChange,
  isDisabled,
  unallowedRoles,
  handleChange,
  errors,
}) => {
  return (
    <div className="input-group col-md-6 col-sm-12">
      <label>{label}</label>
      <select
        className="input-btn"
        name={name}
        onChange={onChange}
        disabled={isDisabled}
        value={value}
      >
        <option value="" disabled hidden>
          Choose one..
        </option>
        {options &&
          options.map((option, index) => {
            return (
              <option
                key={index}
                onChange={handleChange}
                value={option}
                disabled={
                  unallowedRoles && unallowedRoles.restrictions.includes(option)
                }
              >
                {option}
              </option>
            );
          })}
      </select>
      {errors &&
        errors.map((error, index) => (
          <p className="error-message" key={index}>
            {error}
          </p>
        ))}
    </div>
  );
};

export default SelectInput;

SelectInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  unallowedRoles: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.string),
};
