import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './BodyNav.css';

export const BodyNav = ({ label, total, onClick }) => (
  <div className="body-nav d-flex align-items-center justify-content-between">
    <div className="label-side d-flex ">
      <h4 className="label">{label}</h4>
      <p className="total">
        <span>Total </span>
        <span>{total}</span>
      </p>
    </div>
    <Button
      className="action d-flex align-items-center"
      variant="primary"
      onClick={onClick}
    >
      <ion-icon name="add"></ion-icon>
      <p> Add User</p>
    </Button>
  </div>
);

export default BodyNav;

BodyNav.propTypes = {
  label: PropTypes.string,
  total: PropTypes.number,
  onClick: PropTypes.func,
};
