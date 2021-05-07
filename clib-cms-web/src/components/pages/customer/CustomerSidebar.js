import React, { useEffect, useState } from 'react';
import './CustomerSidebar.css';
import PropTypes from 'prop-types';
import CustomersLoading from '../../CustomersLoading';

import CUSTOMER from '../../../api/queries/Customer';
import { useQuery } from '@apollo/react-hooks';

import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const CustomerSidebar = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const { loading, error, data } = useQuery(CUSTOMER.SEARCH_LIST, {
    variables: {
      limit: '1000',
      page: '1',
      search: '',
    },
  });

  useEffect(() => {
    const { searchCustomerList } = data || {};

    if (searchCustomerList) {
      const foundCust = searchCustomerList.find(
        (cust) => cust.insuranceCustomerNo === id
      );
      const { dateOfBirth } = foundCust;

      const withFixedDate = {
        ...foundCust,
        dateOfBirth: format(new Date(dateOfBirth), 'MM/dd/yyyy'),
      };
      setCustomer(withFixedDate);
    }
  }, [data, id]);

  const {
    insuranceCustomerNo,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    placeOfBirth,
    gender,
    emailAddress,
    validIdPresented,
    validIdNumber,
    mobileNumber,
    landline,
    address,
    city,
    zipCode,
    nationality,
    civilStatus,
    sourceOfFunds,
    natureOfWork,
  } = customer || {};

  return (
    <>
      <div className="customer-sidebar">
        {error && <h3>{`Error: ${error.message}`}</h3>}
        {loading && (
          <div className="cust-sidebar-loading">
            <CustomersLoading />
          </div>
        )}
        {data && (
          <>
            <div className="info d-flex flex-column align-items-center">
              <ion-icon name="person-circle"></ion-icon>
              <h5 className="fullname d-flex flex-wrap justify-content-center align-items-center">
                <span className="firstname">{firstName}</span>
                <span className="middlename">{middleName}</span>
                <span className="lastname">{lastName}</span>
              </h5>
              <p className="id">{insuranceCustomerNo}</p>
            </div>

            <div className="details">
              <label>Date of Birth</label>
              <p>{dateOfBirth}</p>
              <label>Place of Birth</label>
              <p>{placeOfBirth}</p>
              <label>Gender</label>
              <p>{gender}</p>
              <label>Valid ID Presented</label>
              <p>{validIdPresented}</p>
              <label>Valid ID Number</label>
              <p>{validIdNumber}</p>
              <label>Mobile Number</label>
              <p>{mobileNumber}</p>
              <label>Landline</label>
              <p>{landline}</p>
              <label>Email Address</label>
              <p>{emailAddress}</p>
              <label>Address</label>
              <p>{address}</p>
              <label>City</label>
              <p>{city}</p>
              <label>Zip Code</label>
              <p>{zipCode}</p>
              <label>Nationality</label>
              <p>{nationality}</p>
              <label>Civil Status</label>
              <p>{civilStatus}</p>
              <label>Source of Funds</label>
              <p>{sourceOfFunds}</p>
              <label>Nature of Work</label>
              <p>{natureOfWork}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CustomerSidebar;
CustomerSidebar.propTypes = {
  customer: PropTypes.object,
};
