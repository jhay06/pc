import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import NavbarContainer from '../../NavbarContainer';
import BackgroundContainer from './BackgroundContainer';
import { useMutation } from '@apollo/react-hooks';
import USER from '../../../api/mutations/Login';
import flashMessages from '../../../lib/FlashMessages';
import '../../Navbar.css';
import _ from 'lodash';

const LoginPage = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [userAuth] = useMutation(USER.LOGIN);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    flashMessages.warnings('You need to login to continue');
  }, []);

  const userLogin = async () => {
    const res = await userAuth({ variables: user });
    const {
      data: {
        login: { exp, errors, token },
      },
    } = res;
    const { designation: loggingRole } = res.data.login.user || {};
    console.log(res);
    const roleIsAllowed = [
      'claims_section_head',
      'claims_department_head',
      'claims_division_head',
    ].includes(_.snakeCase(loggingRole));
    if (errors.length === 0 && roleIsAllowed) {
      sessionStorage.setItem('AUTH_TOKEN', token);
      sessionStorage.setItem('AUTH_EXP', exp);
      flashMessages.success('Success. Please wait for redirection.');
      setTimeout(() => {
        // history.push('/users');
        window.location.replace('/users');
      }, 2500);
    } else {
      if (errors.length === 0 && !roleIsAllowed) {
        flashMessages.errors('Your user role does not have access.');
      } else {
        flashMessages.errors(errors[0]);
      }

      setTimeout(() => {
        window.location.replace('/');
      }, 100000);
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
