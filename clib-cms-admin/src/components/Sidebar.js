import React from 'react';
import SidebarButton from './SidebarButton';
import UserInfo from './UserInfo';
import USER from '../api/queries/User';
import { useQuery } from '@apollo/react-hooks';

import './Sidebar.css';

const Sidebar = () => {
  const { loading, error, data } = useQuery(USER.CURRENT_USER);
  if (loading) return <h3>Loading. . .</h3>;
  if (error) return <h3>{`Error: ${error.message}`}</h3>;
  return (
    <>
      <div className="sidebar-container d-flex flex-column">
        <UserInfo icon="person-circle-outline" text={data.me.fullname} />
        <SidebarButton icon="people" text="Users List" link="/users" />
      </div>
    </>
  );
};

export default Sidebar;
