import React from 'react';
import { Outlet } from 'react-router-dom';
import ClaimTabs from './ClaimTabs';
import CustomerSidebar from './CustomerSidebar';
import './CustomerSection.css';

export const ClaimPage = () => {
  return (
    <>
      <div className="customer-section d-flex flex-column">
        <ClaimTabs />
        <Outlet />
      </div>
      {<CustomerSidebar />}
    </>
  );
};

export default ClaimPage;
