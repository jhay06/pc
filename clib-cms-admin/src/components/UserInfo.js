import React from 'react';
import PropTypes from 'prop-types';
import './UserInfo.css';

export const SidebarButton = ({ text, icon }) => (
  <div className="user-info d-flex align-items-center">
    <div className="avatar">
      <ion-icon className="icon" name={icon}></ion-icon>
    </div>
    <div className="meta-texts">
      <p className="title">Welcome</p>
      <p className="name">{text}</p>
    </div>
  </div>
);

export default SidebarButton;

SidebarButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};
