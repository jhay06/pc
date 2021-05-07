import React, { useEffect } from 'react';
import Navbar from './NavbarContainer';
import Sidebar from './Sidebar';
import DashboardContainer from './DashboardContainer';

const DashboardPage = () => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <DashboardContainer />
    </>
  );
};

export default DashboardPage;
