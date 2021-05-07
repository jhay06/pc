import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import NavbarContainer from './../../NavbarContainer';
import BackgroundContainer from './BackgroundContainer';
import LoginForm from './LoginForm';
import USER from '../../../api/mutations/Login';
import flashMessages from '../../../lib/utils/FlashMessages';
import _ from 'lodash';

const LoginPage = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [userAuth] = useMutation(USER.LOGIN);

  useEffect(() => {
    flashMessages.warnings('You need to login to continue');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userLogin = async () => {
    const res = await userAuth({ variables: user });
    const {
      data: {
        login: { exp, errors, token, user: self },
      },
    } = res;
    const { designation, isTemporaryPassword } = self || {};
    if (errors.length === 0) {
      sessionStorage.setItem('AUTH_TOKEN', token);
      sessionStorage.setItem('AUTH_EXP', exp);
      flashMessages.success('Success. Please wait for redirection.');

      setTimeout(() => {
        const noOverviewAccess = [
          'pioneer_claims',
          'disbursement_staff',
          'accounting_head',
        ];
        var defaultRedirect = '';
        if (isTemporaryPassword) {
          defaultRedirect = '/settings';
        } else if (noOverviewAccess.includes(_.snakeCase(designation))) {
          defaultRedirect = '/overview';
        } else {
          defaultRedirect = '/customers';
        }
        window.location.replace(defaultRedirect);
      }, 2500);
    } else {
      flashMessages.errors(errors[0]);
      setTimeout(() => {
        window.location.replace('/');
      }, 2500);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userLogin();
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <>
      <NavbarContainer />
      <div className="landing-container d-flex">
        <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />
        <BackgroundContainer />
      </div>
    </>
  );
};

export default LoginPage;
