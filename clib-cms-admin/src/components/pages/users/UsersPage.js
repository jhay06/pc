import React from 'react';
import { Outlet } from 'react-router-dom';

import './UsersPage.css';

const UsersPage = () => {
  return (
    <>
      <div className="dashboard-container d-flex">
        <Outlet />
      </div>
    </>
  );
};

export default UsersPage;
