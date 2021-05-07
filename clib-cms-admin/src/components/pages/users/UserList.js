import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './UserList.css';

export const UserList = ({
  id,
  fullname,
  employeeId,
  section,
  designation,
}) => (
  <tbody>
    <tr className="user-list">
      <td className="fullname">
        <Link
          to={`/users/${id}`}
          state={{
            needsRegion: ['claims_lead', 'insurance_specialist'].includes(
              _.snakeCase(designation)
            ),
          }}
        >
          {fullname}
        </Link>
      </td>
      <td>{employeeId}</td>
      <td>{section}</td>
      <td className="designation">{designation}</td>
    </tr>
  </tbody>
);

export default UserList;

UserList.propTypes = {
  fullname: PropTypes.string,
  id: PropTypes.string,
  section: PropTypes.string,
  employeeId: PropTypes.string,
  designation: PropTypes.string,
};
