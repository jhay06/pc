import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OverviewPage from './pages/overview/OverviewPage';
import CustomersPage from './CustomersPage';
import CustomersIndex from './pages/customers/CustomersIndex';
import CustomerPage from './pages/customer/CustomerPage';
import CustomerID from './pages/customers/CustomerID';
import CustomerCOCS from './pages/customer/CustomerCOCS';
import CustomerClaimsPage from './pages/customer/CustomerClaimsPage';
import ClaimIndex from './pages/customer/claims/ClaimIndex';
import NavbarContainer from './NavbarContainer';
import CardPage from './pages/overview/CardPage';
import Sidebar from './Sidebar';
import './pages/overview/DashboardContainer.css';
import ReportsPage from './pages/reports/ReportsPage';
import CustomersLoading from './CustomersLoading';
import { useRole } from '../hooks/RoleContext';
import useRoleRestrict from '../hooks/useRoleRestrict';
import SettingsPage from './pages/settings/SettingsPage';

const AppDashboardRoutes = () => {
  const role = useRole();
  const { isTemporaryPassword } = role.data?.me || {};

  const { hasAccess: hasOverviewAccess } = useRoleRestrict('overview');

  return (
    <>
      {role.data ? (
        <>
          <NavbarContainer />
          <Sidebar />
          <div className="dashboard-container">
            <Routes>
              {!isTemporaryPassword && (
                <>
                  {hasOverviewAccess && (
                    <>
                      <Route path="/overview" element={<OverviewPage />} />
                      <Route
                        path="/overview/:claimType"
                        element={<CardPage />}
                      />
                    </>
                  )}
                  <Route path="/customers" element={<CustomersPage />}>
                    <Route path="/" element={<CustomersIndex />} />
                    <Route path=":id" element={<CustomerPage />}>
                      <Route path="/" element={<CustomerID />} />
                      <Route path="/cocs" element={<CustomerCOCS />} />
                      <Route path="/claims" element={<CustomerClaimsPage />}>
                        <Route path="/" element={<ClaimIndex />} />
                      </Route>
                    </Route>
                  </Route>
                  <Route path="/reports" element={<ReportsPage />} />
                </>
              )}
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: 200 }}>
          <CustomersLoading />
        </div>
      )}
    </>
  );
};

export default AppDashboardRoutes;
