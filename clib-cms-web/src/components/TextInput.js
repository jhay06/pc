import React from 'react';
import PropTypes from 'prop-types';
import './InputGroup.css';

export const editableBenefits = [
  'Accidental Disablement Benefit',
  'Accidental Dismemberment Benefit',
];
export const TextInput = ({
  label,
  placeholder,
  id,
  handleChange,
  value,
  errors,
  actionType,
  benefit,
  fullWidth,
  ...inputProps
}) => {
  var disabledIds = ['fullName', 'address', 'amountSettled', 'customAmount'];
  if (benefit && benefit.some((item) => editableBenefits.indexOf(item) >= 0)) {
    disabledIds = disabledIds.filter((item) => item !== 'customAmount');
  }

  const onClaimModalDisabling =
    disabledIds.find((item) => item === id) ||
    (actionType === 'add' && id === 'payoutReference')
      ? true
      : false;

  return (
    <div
      className={`input-group col-sm-12 
        ${fullWidth ? 'col-md-12' : 'col-md-6'} 
        ${errors ? 'error-input' : ''}`}
    >
      <label>{label}</label>

      <input
        onChange={handleChange}
        id={id}
        placeholder={placeholder}
        type="text"
        disabled={onClaimModalDisabling}
        value={value}
        {...inputProps}
      />
      {errors?.map((error, i) => (
        <p key={i} className="error-message-form">
          {error}
        </p>
      ))}
    </div>
  );
};

export default TextInput;

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  errors: PropTypes.array,
  actionType: PropTypes.string,
  benefit: PropTypes.array,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
};
