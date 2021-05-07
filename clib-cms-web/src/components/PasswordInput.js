import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './pages/login/LoginForm.css';
import './InputGroup.css';

const PasswordInput = ({ label, errors, ...inputProps }) => {
  const [eye, setEye] = useState({
    type: 'password',
    icon: 'eye-off-outline',
  });
  const showHideChangePassword = () => {
    if (eye.type === 'password') {
      setEye({ icon: 'eye-outline', type: 'text' });
    } else {
      setEye({ icon: 'eye-off-outline', type: 'password' });
    }
  };

  return (
    <>
      <div
        className={`input-group -password col-md-6 col-sm-12 ${
          errors ? 'error-input' : ''
        }`}
      >
        <label>{label}</label>
        <input
          name="password"
          type={eye.type}
          icon={eye.icon}
          placeholder="**********"
          {...inputProps}
        />
        <ion-icon icon={eye.icon} onClick={showHideChangePassword}></ion-icon>
        {errors?.map((error, i) => (
          <p key={i} className="error-message-form">
            {error}
          </p>
        ))}
      </div>
    </>
  );
};

export default PasswordInput;

PasswordInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  errors: PropTypes.array,
};
