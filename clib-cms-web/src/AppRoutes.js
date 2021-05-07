import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './components/pages/login/LoginPage';
import AppDashboardRoutes from './components/AppDashboardRoutes';
import helpers from './lib/utils/Helpers';
import { RoleProvider } from './hooks/RoleContext';

const AppRoutes = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  console.log('isLoggedIn', isLoggedIn);
  useEffect(() => {
    setLoggedIn(helpers.isLoggedIn());
  }, []);

  return (
    <Router>
      {helpers.isLoggedIn() ? (
        <RoleProvider>
          <AppDashboardRoutes />
        </RoleProvider>
      ) : (
        <LoginPage />
      )}
    </Router>
  );
};

export default AppRoutes;
