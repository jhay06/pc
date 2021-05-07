import React from 'react';
import ClaimTabs from './ClaimTabs';
import { Outlet } from 'react-router-dom';
import './TabContainers.css';

export const ClaimContainer = () => (
  <>
    <div className="tab-container test">
      <ClaimTabs />
      <Outlet />
    </div>
  </>
);

export default ClaimContainer;
