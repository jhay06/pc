import React from 'react';
import PropTypes from 'prop-types';
import './InputGroup.css';

export const SelectInput = ({
  label,
  id,
  handleChange,
  actionType,
  errors,
  value,
  options,
}) => {
  const isSelectable =
    (actionType === 'edit' && label === 'Payout Branch') ||
    actionType === 'reports';

  return (
    <div
      className={`input-group col-sm-12 col-md-6 ${
        errors ? 'error-input' : ''
      }`}
    >
      <label>{label}</label>
      <select
        id={id}
        onChange={handleChange}
        className="input-btn"
        disabled={isSelectable ? false : true}
        value={value}
      >
        <option value="" selected disabled hidden>
          Choose branch
        </option>
        {options.map((item, i) => (
          <option key={i} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      {errors?.map((error, i) => (
        <p key={i} className="error-message-form">
          {error}
        </p>
      ))}
    </div>
  );
};

export default SelectInput;

SelectInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  actionType: PropTypes.string,
  errors: PropTypes.array,
  value: PropTypes.string,
  options: PropTypes.object,
};
