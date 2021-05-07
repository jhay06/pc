import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './components/pages/login/LoginPage';
import AppDashboardRoutes from './components/AppDashboardRoutes';
import helpers from './lib/Helpers';

const Routes = () => {
  return (
    <Router>
      {helpers.isLoggedIn() ? <AppDashboardRoutes /> : <LoginPage />}
    </Router>
  );
};

export default Routes;
