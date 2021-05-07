import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ClaimModal from './ClaimModal';
import './ClaimTabs.css';
import { useQuery } from '@apollo/react-hooks';
import CUSTOMER from '../../../api/queries/Customer';
import useRoleRestrict from '../../../hooks/useRoleRestrict';

const ClaimTabs = () => {
  const { id } = useParams();
  const { data } = useQuery(CUSTOMER.COC_LIST, {
    variables: {
      limit: '1000',
      page: '1',
      customerNo: id,
    },
  });
  const { hasAccess: addClaimAccess } = useRoleRestrict('addClaim');

  const [showClaimFormModal, setShowClaimFormModal] = useState(false);
  const handleShowClaimFormModal = () => setShowClaimFormModal(true);
  const handleCloseClaimFormModal = () => {
    setShowClaimFormModal(false);
  };

  const location = useLocation();
  const { pathname } = location;
  const [cocLinkActive, setCocLinkActive] = useState(
    pathname.includes('coc') ? true : false
  );
  const [claimsLinkActive, setClaimsLinkActive] = useState(
    pathname.includes('claims') ? true : false
  );
  const changeCocLinkActiveButton = () => {
    setCocLinkActive(true);
    setClaimsLinkActive(false);
  };
  const changeClaimsLinkActiveButton = () => {
    setCocLinkActive(false);
    setClaimsLinkActive(true);
  };

  return (
    <>
      <div
        className="claim-tabs d-flex align-items-center justify-content-between"
        defaultActiveKey="/policy"
      >
        <div className="d-flex">
          <Link
            to={`/customers/${id}/cocs`}
            className={`tab-menu ${cocLinkActive ? '-active' : ''}`}
            id={id}
            onClick={() => changeCocLinkActiveButton()}
          >
            COC
          </Link>
          <Link
            to={`/customers/${id}/claims`}
            className={`tab-menu ${claimsLinkActive ? '-active' : ''}`}
            id={id}
            onClick={() => changeClaimsLinkActiveButton()}
          >
            Claims
          </Link>
        </div>
        <ClaimModal
          show={showClaimFormModal}
          handleClose={handleCloseClaimFormModal}
          actionType="add"
        />
        {addClaimAccess && data && (
          <Button
            className="action"
            variant="primary"
            onClick={handleShowClaimFormModal}
          >
            <ion-icon name="add"></ion-icon>Claim
          </Button>
        )}
      </div>
    </>
  );
};

export default ClaimTabs;

ClaimTabs.propTypes = {
  onClick: PropTypes.func,
};
