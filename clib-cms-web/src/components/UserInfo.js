import React from 'react';
import PropTypes from 'prop-types';
import './UserInfo.css';

const UserInfo = ({ text, icon, onClick }) => (
  <div className="user-info d-flex align-items-center" onClick={onClick}>
    <div className="avatar">
      <p className="edit">EDIT</p>
      <ion-icon className="icon" name={icon}></ion-icon>
    </div>
    <div className="meta-texts">
      <p className="title">Welcome</p>
      <p className="name">{text}</p>
    </div>
  </div>
);

export default UserInfo;

UserInfo.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};
