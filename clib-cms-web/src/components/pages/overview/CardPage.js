import React, { useEffect, useState } from 'react';
import LabelTitle from '../customers/LabelTitle';
import './../../ListsContainer.css';
import { useParams } from 'react-router-dom';
import ClaimLink from './ClaimLink';
import CustomersLoading from '../../CustomersLoading';
import { Pagination } from 'react-bootstrap';
import useOverviewClaims from '../../../hooks/useOverviewClaims';
import useSearch from '../../../hooks/useSearch';
import usePagination from '../../../hooks/usePagination';
import CUSTOMER from '../../../api/queries/Customer';
import { useQuery } from '@apollo/react-hooks';
import CustomerSearch from '../customers/CustomerSearch';
const overviewCards = {
  reported: 'Reported',
  pendingRequirements: 'Pending Requirements',
  processing: 'Processing',
  forApprovalOfInsurer: 'For Approval of Insurer',
  approvedByInsurer: 'Approved by Insurer',
  readyForRelease: 'Ready for Release',
};

const ReportedPage = () => {
  const { data: custData } = useQuery(CUSTOMER.SEARCH_LIST, {
    variables: {
      limit: '1000',
      page: '1',
      search: '',
    },
  });
  const [claimsCusts, setClaimsCusts] = useState([]);

  const { claimType } = useParams();

  const [data, loading, error] = useOverviewClaims(claimType);

  const { totalResult, claims } = (data && data[Object.keys(data)[0]]) || {};

  useEffect(() => {
    if (custData && claims) {
      setClaimsCusts(
        claims.map((claim) => ({
          ...claim,
          customerObj: custData.searchCustomerList.find(
            (customer) => customer.insuranceCustomerNo === claim.customerNo
          ),
        }))
      );
    }
  }, [custData, claims]);

  const [setSearchText, searchedData, searchText] = useSearch(
    claimsCusts,
    true
  );

  const [pagedData, items, setPagination] = usePagination(
    searchedData,
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

  return (
    <>
      <div className="lists-container">
        <LabelTitle
          label={overviewCards[claimType]}
          number={data ? totalResult : '0'}
        />

        <CustomerSearch
          handleInputChange={handleInputChange}
          searchText={searchText}
        />

        <div className="table-wrapper">
          <table className="table-container">
            <thead>
              <tr className="customer-label">
                <th>Customer Name</th>
                <th>Customer Number</th>
                <th>Claim Reference Number</th>
                <th>Product Code</th>
              </tr>
            </thead>

            <tbody>
              {data && !loading && (
                <>
                  {pagedData.map((claim, index) => (
                    <ClaimLink claim={claim} key={index} />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="overview-loader">
            <CustomersLoading />
          </div>
        )}
        {error && <h1>{error.message}</h1>}

        {data && (
          <Pagination className="overview-pagination">{items}</Pagination>
        )}
      </div>
    </>
  );
};

export default ReportedPage;
