import React from 'react';
import PropTypes from 'prop-types';
import './LabelTitle.css';

export const LabelTitle = ({ label, number }) => {
  console.log(number);
  return (
    <>
      <div className="label-title d-flex align-items-center justify-content-between">
        <div className="label-side d-flex ">
          <h4 className="label">{label}</h4>
          {number && <p className="total">{`${number} Total`}</p>}
        </div>
      </div>
    </>
  );
};

export default LabelTitle;

LabelTitle.propTypes = {
  label: PropTypes.string,
  number: PropTypes.string,
};
