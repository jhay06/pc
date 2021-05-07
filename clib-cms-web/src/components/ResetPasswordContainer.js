import React from 'react';
import Button from 'react-bootstrap/Button';
import PasswordInput from './PasswordInput';

import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  return (
    <>
      <div className="password-container d-flex align-items-center justify-content-center">
        <div className="form d-flex align-items-center flex-column">
          <ion-icon className="icon" name="lock-closed-outline"></ion-icon>
          <h5>Update Password</h5>
          <PasswordInput label="password" />
          <PasswordInput label="Confirm password" />
          <Button variant="primary">Submit</Button>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
