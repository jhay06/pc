import React from 'react';
import CustomerID from './CustomerID';
import LabelTitle from './LabelTitle';
import './../../ListsContainer.css';
import Pagination from 'react-bootstrap/Pagination';
import CustomersLoading from '../../CustomersLoading';
import CustomerSearch from './CustomerSearch';
import useSearch from '../../../hooks/useSearch';
import usePagination from '../../../hooks/usePagination';
import useAllCustomers from '../../../hooks/useAllCustomers';
import useColumnSort from '../../../hooks/useColumnSort';

export const CustomersIndex = () => {
  const [customers, loading, error, data] = useAllCustomers();
  const [setSearchText, searchedData, searchText] = useSearch(customers);
  const [sort, sortedData, sortMode, sortAscending] = useColumnSort(
    searchedData
  );
  const [pagedData, items, setPagination] = usePagination(
    sortedData,
    searchedData
  );

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };
  console.log(searchedData);
  return (
    <>
      <div className="lists-container">
        <LabelTitle
          label="Customers List"
          number={searchedData?.length || null}
        />
        <CustomerSearch
          handleInputChange={handleInputChange}
          searchText={searchText}
        />
        {error && <h3>{`Error: ${error.message}`}</h3>}
        {loading && (
          <div className="loading-spinner">
            <CustomersLoading />
          </div>
        )}
        {data && (
          <div className="table-wrapper">
            <table className="table-container">
              <thead>
                <tr className="customer-label">
                  {[
                    'firstName',
                    'insuranceCustomerNo',
                    'dateOfBirth',
                    'address',
                  ].map((columnId, index) => {
                    const columnNames = [
                      'Full Name',
                      'Customer Number',
                      'Date of Birth',
                      'Complete Address',
                    ];
                    return (
                      <th
                        onClick={() => sort(columnId)}
                        key={index}
                        className={`${columnId} ${
                          sortMode === columnId ? 'selected-columnSort' : ''
                        }`}
                      >
                        {columnNames[index]}
                        {sortMode === columnId ? (
                          <ion-icon
                            name={sortAscending ? 'caret-down' : 'caret-up'}
                            style={{ paddingLeft: 4 }}
                          ></ion-icon>
                        ) : (
                          <ion-icon
                            name="caret-forward"
                            style={{ paddingLeft: 4 }}
                          ></ion-icon>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {pagedData.map((customer, index) => {
                  const {
                    firstName,
                    middleName,
                    lastName,
                    insuranceCustomerNo,
                    dateOfBirth,
                    address,
                    city,
                    zipCode,
                  } = customer;
                  return (
                    <CustomerID
                      key={index}
                      fullname={`${firstName} ${middleName} ${lastName}`}
                      id={insuranceCustomerNo}
                      birthdate={dateOfBirth}
                      address={`${address}, ${city}, ${zipCode}`}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <Pagination className="pagination-tabs">{items}</Pagination>
      </div>
    </>
  );
};

export default CustomersIndex;
