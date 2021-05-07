import React from 'react';
import PropTypes from 'prop-types';
import TransferList from './TransferList';
import '../../InputGroup.css';

export const COCInput = ({
  label,
  errors,
  value,
  handleCocSelect,
  actionType,
  benefits,
}) => {
  return (
    <div
      className={`input-group col-sm-12 col-md-12
    ${errors ? 'error-input' : ''}`}
    >
      <label>{label}</label>
      <TransferList
        existingCocs={value}
        handleCocSelect={handleCocSelect}
        actionType={actionType}
        benefits={benefits}
      />
      {errors?.map((error, i) => (
        <p
          key={i}
          className="error-message-form"
          style={{ textAlign: 'center' }}
        >
          {error}
        </p>
      ))}
    </div>
  );
};

export default COCInput;

COCInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  errors: PropTypes.string,
  value: PropTypes.array,
  actionType: PropTypes.string,
  handleCocSelect: PropTypes.func,
  benefits: PropTypes.string,
};
