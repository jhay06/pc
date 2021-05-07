import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import USER from '../../../api/queries/User';
import { useQuery } from '@apollo/react-hooks';
import UserSidebar from './UserSidebar';

const UserProfile = () => {
  let { id } = useParams();
  const { state } = useLocation();
  const { loading, error, data } = useQuery(
    state.needsRegion ? USER.FIND_USER_WITH_REGION : USER.FIND_USER_NO_REGION,
    {
      variables: { id },
    }
  );

  if (loading) return <h3>Loading. . .</h3>;
  if (error) return <h3>{`Error: ${error.message}`}</h3>;

  return <UserSidebar data={data.showAdmin} />;
};

export default UserProfile;
