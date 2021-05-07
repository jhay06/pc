import { isNil } from 'lodash';

const isLoggedIn = () => {
  // const now = Math.floor(Date.now() / 1000);
  const token = sessionStorage.AUTH_TOKEN;
  // const exp = sessionStorage.AUTH_EXP;
  return !isNil(token) && token !== ''; //&& exp > now;
};

const clearStorage = () => {
  sessionStorage.clear();
  window.location.reload();
};

export default {
  isLoggedIn,
  clearStorage,
};
