import React from 'react';
import PropTypes from 'prop-types';
import COCItem from './COCItem';
import './ContentLabel.css';

export const COCLabel = ({ label, input }) => (
  <>
    <div className="content-label col-md-12">
      <label>{label}</label>
      <div className="coc-items d-flex align-items-center flex-wrap">
        {input.map((coc, index) => (
          <COCItem key={index} number={coc} />
        ))}
      </div>
    </div>
  </>
);

export default COCLabel;

COCLabel.propTypes = {
  label: PropTypes.string,
  input: PropTypes.array,
};
