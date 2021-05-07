import React, { useEffect, useState } from 'react';
import ContentLabel from '../ContentLabel';
import COCLabel from '../COCLabel';
import CoverageLabel from '../CoverageLabel';
import '../ClaimMenu.css';
import { useParams } from 'react-router-dom';
import CUSTOMER from '../../../../api/queries/Customer';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

export const ClaimInfo = ({ claim }) => {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const { data } = useQuery(CUSTOMER.SEARCH_LIST, {
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
    amountSettled,
    claimant,
    claimantContactNo,
    dateFiled,
    benefits,
    cocs,
    clBranchName,
    payoutBranchName,
    payoutReferenceNumber,
    remarks,
    dateOfLoss,
    claimantRelationship,
    branchCode,
    payoutBranch,
    internalClaimsStatus,
  } = claim || {};

  const { firstName, middleName, lastName, dateOfBirth, address, city } =
    customer || {};

  const addbAmount = () => {
    const foundADDB = benefits.find((item) => item.code === 'ADDB');
    return foundADDB ? foundADDB.amount : 'N/A';
  };

  return (
    <>
      <div className="claim-info d-flex flex-wrap">
        <ContentLabel label="Settlement Amount" input={amountSettled} />
        <ContentLabel label="AD&D Amount" input={addbAmount()} />
        <COCLabel label="List of COCs" input={cocs} />
        <ContentLabel
          label="Full Name"
          input={`${firstName} ${middleName} ${lastName}`}
        />
        <ContentLabel label="Date of Birth" input={dateOfBirth} />
        <ContentLabel label="Complete Address" input={`${address}, ${city}`} />
        <ContentLabel label="Beneficiary" input={claimant} />
        <ContentLabel
          label="Relationship to Owner"
          input={claimantRelationship}
        />
        <ContentLabel label="Contact Number" input={claimantContactNo} />
        <CoverageLabel
          label="Coverage Type"
          cbLocation="ClaimInfo"
          benefits={benefits}
        />
        <ContentLabel
          label="CL Branch"
          input={!branchCode ? 'N/A' : `${branchCode} - ${clBranchName}`}
        />
        <ContentLabel
          label="Payout Branch"
          input={!payoutBranch ? '' : `${payoutBranch} - ${payoutBranchName}`}
        />
        <ContentLabel
          label="Date of Notification"
          input={format(new Date(dateFiled), 'MMMM dd, yyyy - p')}
        />
        <ContentLabel
          label="Date of Loss"
          input={format(new Date(dateOfLoss), 'MMMM dd, yyyy')}
        />
        <ContentLabel
          label="Payout Reference Number"
          input={payoutReferenceNumber}
        />
        <ContentLabel
          label="Internal Claim Status"
          input={
            internalClaimsStatus === 'NOT AVAILABLE'
              ? 'Not Applicable'
              : internalClaimsStatus
          }
        />

        <ContentLabel label="Remarks" input={remarks} />
      </div>
    </>
  );
};

export default ClaimInfo;

ClaimInfo.propTypes = {
  claim: PropTypes.object,
};
