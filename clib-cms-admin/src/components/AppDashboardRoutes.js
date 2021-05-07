import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProfile from './pages/users/UserProfile';
import NavbarContainer from './NavbarContainer';
import Sidebar from './Sidebar';
import UsersContainer from './pages/users/UsersContainer';
import { RoleProvider } from '../hooks/RoleContext';

const AppDashboardRoutes = () => {
  return (
    <>
      <RoleProvider>
        <div className="dashboard-container">
          <NavbarContainer />
          <div className="dashboard-container d-flex">
            <Sidebar />
            <Routes>
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/users/:id" element={<UsersContainer />}>
                <Route path="/" element={<UserProfile />} />
              </Route>
            </Routes>
          </div>
        </div>
      </RoleProvider>
    </>
  );
};

export default AppDashboardRoutes;
