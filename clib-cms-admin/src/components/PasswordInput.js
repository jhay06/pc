import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './pages/login/LoginForm.css';
import './InputGroup.css';

const PasswordInput = ({ label, onChange, errors }) => {
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
      <div className="input-group col-md-6 col-sm-12">
        <label>{label}</label>
        <input
          name="password"
          type={eye.type}
          icon={eye.icon}
          placeholder="**********"
          onChange={onChange}
        />
        <ion-icon icon={eye.icon} onClick={showHideChangePassword}></ion-icon>
      </div>
      {errors &&
        errors.length > 0 &&
        errors.map((error, index) => (
          <p className="error-message" key={index}>
            {error}
          </p>
        ))}
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
