import React from 'react';
import PropTypes from 'prop-types';
import './InputGroup.css';

export const TextInput = ({
  label,
  name,
  type,
  placeholder,
  onChange,
  value,
  errors,
}) => {
  const checkError = () => {
    return errors && errors.length > 0
      ? 'input-group col-md-6 col-sm-12 error-input'
      : 'input-group col-md-6 col-sm-12';
  };

  return (
    <div className={checkError()}>
      <label>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {errors &&
        errors.length > 0 &&
        errors.map((error, index) => (
          <p className="error-message" key={index}>
            {error}
          </p>
        ))}
    </div>
  );
};

export default TextInput;

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  errors: PropTypes.array,
};
