import React, { createContext, useContext, useState } from 'react';
import propTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import USER from '../api/queries/User';

const RoleContext = createContext();
export const useRole = () => useContext(RoleContext);

export function RoleProvider({ children }) {
  const { data } = useQuery(USER.CURRENT_USER);

  const [userRole, setUserRole] = useState('no role');
  const switchRole = () => setUserRole('a test role');

  return (
    <RoleContext.Provider value={{ userRole, switchRole, data }}>
      {children}
    </RoleContext.Provider>
  );
}

RoleProvider.propTypes = {
  children: propTypes.node,
};
