import React from 'react';
import PropTypes from 'prop-types';
import './COCItem.css';

export const COCItem = ({ number }) => (
  <div className="coc-item d-flex align-items-center">
    <p className="coc">{number}</p>
  </div>
);

export default COCItem;

COCItem.propTypes = {
  number: PropTypes.string,
};
