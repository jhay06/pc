import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const { ...extraProps } = rest;
      return <Component {...props} {...extraProps} />;
    }}
  />
);

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
};
