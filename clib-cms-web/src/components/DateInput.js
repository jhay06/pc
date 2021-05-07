import React from 'react';
import PropTypes from 'prop-types';
import './InputGroup.css';
import { format } from 'date-fns';

export const DateInput = ({
  label,
  id,
  handleChange,
  value,
  errors,
  refDate,
  ...inputProps
}) => {
  return (
    <div
      className={`input-group col-sm-12 col-md-6
    ${errors ? 'error-input' : ''}`}
    >
      <label>{label}</label>
      <input
        id={id}
        onChange={handleChange}
        type="date"
        value={value}
        defaultValue={value}
        max={
          id === 'dateOfLoss'
            ? format(new Date(refDate), 'yyyy-MM-dd')
            : format(new Date(), 'yyyy-MM-dd')
        }
        {...inputProps}
      ></input>
      {errors?.map((error, i) => (
        <p key={i} className="error-message-form">
          {error}
        </p>
      ))}
    </div>
  );
};

export default DateInput;

DateInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  refDate: PropTypes.string,
  errors: PropTypes.array,
};
