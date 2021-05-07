import React from 'react';
import { Link } from 'react-router-dom';
import '../customer/AccordionList.css';
import PropTypes from 'prop-types';

export const ClaimLink = ({ claim }) => {
  const { claimsReferenceNumber, customerNo } = claim || {};
  const { fullname } = claim.customerObj || {};
  return (
    <>
      <tr className="customer-infos">
        <Link
          to={`/customers/${customerNo}/claims`}
          style={{ textDecoration: 'none' }}
        >
          <td>{fullname}</td>
        </Link>

        <td>{customerNo}</td>
        <td>{claimsReferenceNumber}</td>
        <td>MPABP</td>
      </tr>
    </>
  );
};

export default ClaimLink;

ClaimLink.propTypes = {
  claim: PropTypes.object,
  claimKey: PropTypes.number,
  claimsRefetch: PropTypes.func,
};
