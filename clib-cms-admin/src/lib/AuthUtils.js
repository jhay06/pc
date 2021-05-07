import { isNil } from 'lodash';

const token = sessionStorage.AUTH_TOKEN;

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
};
