import { isNil } from 'lodash';
// import axios from 'axios';
// import flashMessages from './FlashMessages';

const token = sessionStorage.AUTH_TOKEN;

const authenticateUser = () => {
  // const token = sessionStorage.AUTH_TOKEN;
  // const authUser = {
  //   headers: {
  //     Authorization: `Bearer ` + token,
  //   },
  // };
  // if (!isNil(token) && token !== '') {
  //   axios
  //     .get(process.env.REACT_APP_API_URL + '/auth', authUser)
  //     .then(() => {
  //       history.push('/overview');
  //     })
  //     .catch(() => {
  //       history.push('/');
  //       flashMessages.warnings('You need to login to continue');
  //     });
  // } else {
  //   flashMessages.warnings('You need to login to continue');
  //   history.push('/');
  // }
};

const authorizeUserLogin = () => {
  const hasToken = !isNil(token) || !isNil(token);
  if (hasToken) {
    console.log('hasToken');
  } else {
    console.log('hasToken');
    console.log('dontHaveToken');
  }
};

export default {
  authorizeUserLogin,
  authenticateUser,
};
