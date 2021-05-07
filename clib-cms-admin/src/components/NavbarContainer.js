import React from 'react';
import Logo from '../assets/img/cebuana-logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import helpers from '../lib/Helpers';

import './Navbar.css';

const NavbarContainer = () => {
  return (
    <>
      <Navbar
        className={helpers.isLoggedIn() ? '-login' : ''}
        fixed="top"
        expand="lg"
      >
        <img src={Logo} alt="cebuana-logo" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            {helpers.isLoggedIn() ? (
              <a
                className="top-link"
                to="/signout"
                href="#/signout"
                onClick={() => {
                  sessionStorage.clear();
                  window.location.replace('/');
                }}
              >
                Sign Out
              </a>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarContainer;
