import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

export const LoginText = ({ description }) => (
  <div className="login-group">
    <Text text={description} type="description" />
  </div>
);

export default LoginText;

LoginText.propTypes = {
  description: PropTypes.string,
};
