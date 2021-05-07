import React from 'react';
import PropTypes from 'prop-types';
import './TotalCard.css';

const TotalCard = ({ text, number }) => {
  return (
    <div className="">
      <div className="total-card d-flex flex-column">
        <p className="total">{number}</p>
        <p className="label">{text}</p>
      </div>
    </div>
  );
};

export default TotalCard;

TotalCard.propTypes = {
  text: PropTypes.string,
  number: PropTypes.string,
};
