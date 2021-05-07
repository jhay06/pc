import React, { useState } from 'react';
import SidebarButton from './SidebarButton';
import UserInfo from './UserInfo';
import UserModal from './pages/customer/UserModal';
import USER from '../api/queries/User';
import { useQuery } from '@apollo/react-hooks';
import './Sidebar.css';
import { useLocation } from 'react-router-dom';
import useRoleRestrict from '../hooks/useRoleRestrict';
import { useRole } from '../hooks/RoleContext';

const Sidebar = () => {
  const { hasAccess } = useRoleRestrict('overview');

  const [showUserFormModal, setShowUserFormModal] = useState(false);
  const handleShowUserFormModal = () => setShowUserFormModal(true);
  const handleCloseUserFormModal = () => setShowUserFormModal(false);
  const { loading, error, data } = useQuery(USER.CURRENT_USER);
  const { data: dataWithRegion } = useQuery(USER.CURRENT_USER_WITH_REGION);
  const {
    data: {
      me: { isTemporaryPassword },
    },
  } = useRole();

  const location = useLocation();
  const { pathname } = location;

  const sidebarPages = ['overview', 'customers', 'settings', 'reports'];
  const currentPage = sidebarPages.find((page) => pathname.includes(page));
  const [activeLink, setActiveLink] = useState(currentPage);

  if (error) return <h3>{`Error: ${error}`}</h3>;
  if (loading) return <h3>Loading. . .</h3>;
  if (data || dataWithRegion)
    return (
      <>
        <UserModal
          show={showUserFormModal}
          handleClose={handleCloseUserFormModal}
          userDetails={data ? data.me : dataWithRegion.me}
        />
        <div className="sidebar-container d-flex flex-column">
          <UserInfo
            icon="person-circle-outline"
            text={data.me.fullname}
            onClick={handleShowUserFormModal}
          />

          {!isTemporaryPassword && (
            <>
              {hasAccess && (
                <SidebarButton
                  activeClass
                  icon="grid-outline"
                  text="Overview"
                  link="/overview"
                  activeLink={activeLink === 'overview' ? true : false}
                  onClick={() => setActiveLink('overview')}
                />
              )}
              <SidebarButton
                icon="person-outline"
                text="Customers"
                link="/customers"
                activeLink={activeLink === 'customers' ? true : false}
                onClick={() => setActiveLink('customers')}
              />
              <SidebarButton
                icon="newspaper-outline"
                text="Reports"
                link="/reports"
                activeLink={activeLink === 'reports' ? true : false}
                onClick={() => setActiveLink('reports')}
              />
            </>
          )}

          <SidebarButton
            icon="settings-outline"
            text="Settings"
            link="/settings"
            activeLink={activeLink === 'settings' ? true : false}
            onClick={() => setActiveLink('settings')}
          />
        </div>
      </>
    );
};
export default Sidebar;
