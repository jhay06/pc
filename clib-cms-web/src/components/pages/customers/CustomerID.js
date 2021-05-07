import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CustomerList.css';

const CustomerID = ({ fullname, id, birthdate, address }) => {
  return (
    <tr className="customer-list">
      <td className="fullname">
        <Link to={`/customers/${id}/cocs`}>{fullname}</Link>
      </td>
      <td>{id}</td>
      <td>{birthdate}</td>
      <td className="address">{address}</td>
    </tr>
  );
};
export default CustomerID;
CustomerID.propTypes = {
  fullname: PropTypes.string,
  id: PropTypes.string,
  birthdate: PropTypes.string,
  address: PropTypes.string,
};
