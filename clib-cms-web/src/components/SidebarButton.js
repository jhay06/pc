import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SidebarButton.css';

export const SidebarButton = ({
  text,
  icon,
  link,
  id,
  activeLink,
  onClick,
}) => (
  <Link
    to={link}
    className={`sidebar-button ${activeLink ? '-active' : ''} main-nav`}
    id={id}
    onClick={onClick}
  >
    <ion-icon className="icon" name={icon}></ion-icon>
    {text}
  </Link>
);

export default SidebarButton;

SidebarButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
  activeLink: PropTypes.bool,
  onClick: PropTypes.func,
};
