import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SidebarButton.css';

export const SidebarButton = ({ text, icon, link }) => (
  <Link to={link} className="sidebar-button">
    <ion-icon className="icon" name={icon}></ion-icon>
    <p>{text}</p>
  </Link>
);

export default SidebarButton;

SidebarButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
};
