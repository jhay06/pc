import React, { useState } from 'react';
import LoginText from './LoginText';
import ForgotPasswordModal from './ForgotPasswordModal';
import Button from 'react-bootstrap/Button';
import Logo from '../../../assets/img/clib-logo.svg';
import PropTypes from 'prop-types';

import './LoginForm.css';

const LoginForm = ({ handleSubmit, handleChange }) => {
  const [eye, setEye] = useState({
    type: 'password',
    icon: 'eye-off-outline',
  });
  const onChange = () => {
    if (eye.type === 'password') {
      setEye({ icon: 'eye-outline', type: 'text' });
    } else {
      setEye({ icon: 'eye-off-outline', type: 'password' });
    }
  };

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const handleShowForgotPasswordModal = () => setShowForgotPasswordModal(true);
  const handleCloseForgotPasswordModal = () =>
    setShowForgotPasswordModal(false);

  const submitViaEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="form-container d-flex flex-column col-md-6 col-sm-12">
      <img src={Logo} alt="clib-logo" />
      <LoginText description="Claims Management System" />
      <div className="form-section d-flex flex-column">
        <div className="input-field">
          <span>Username or Email Address</span>
          <input
            type="username"
            name="username"
            label="Username"
            placeholder="Username"
            onChange={handleChange}
            onKeyPress={submitViaEnter}
          />
        </div>

        <div className="input-field">
          <span>Password</span>
          <input
            name="password"
            type={eye.type}
            icon={eye.icon}
            placeholder="**********"
            onChange={handleChange}
            onKeyPress={submitViaEnter}
          />
          <ion-icon icon={eye.icon} onClick={onChange}></ion-icon>
        </div>

        <Button
          className="primary-btn"
          variant="primary"
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <ForgotPasswordModal
          show={showForgotPasswordModal}
          handleClose={handleCloseForgotPasswordModal}
        />
        <Button
          className="reset-link"
          variant="link"
          onClick={handleShowForgotPasswordModal}
        >
          Reset password?
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  onClick: PropTypes.func,
};
