import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import ClaimModal from './ClaimModal';
import DocumentModal from './claims/DocumentModal';
import './GeneralMenu.css';
import PropTypes from 'prop-types';
import useClaimStatus from '../../../hooks/useClaimStatus';
import useRoleRestrict from '../../../hooks/useRoleRestrict';

const GeneralMenu = ({
  uniqueClickHandle,
  claimKey,
  claim,
  refetchAfterStatusEdit,
  claimsRefetch,
  isUpdatingStatus,
  docsQueryObj,
}) => {
  const { data, refetch } = docsQueryObj;
  const { hasAccess: editClaimAccess } = useRoleRestrict('editClaim');
  const { hasAccess: documentsAccess } = useRoleRestrict('claimDocuments');
  const [showClaimFormModal, setShowClaimFormModal] = useState(false);
  const handleShowClaimFormModal = () => {
    setShowClaimFormModal(true);
  };
  const handleCloseClaimFormModal = () => setShowClaimFormModal(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const handleShowDocumentModal = () => setShowDocumentModal(true);
  const handleCloseDocumentModal = () => setShowDocumentModal(false);
  const handleClaimEditSave = () => {
    setShowClaimFormModal(false);
  };
  const { hasAccess } = useRoleRestrict('updateStatus');

  const myRef = useRef();
  const handleClickOutside = (e) => {
    if (
      !myRef.current.contains(e.target) &&
      e.target.id !== `claim${claimKey}` &&
      !showClaimFormModal &&
      !showDocumentModal
    ) {
      uniqueClickHandle(true);
    }
  };
  const handleClickInside = () => uniqueClickHandle(false);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const [updateStatus, actionsAvailable, loading] = useClaimStatus(
    claim,
    refetchAfterStatusEdit
  );

  const { canSubmit, canDeny, canApprove, canDisapprove } =
    actionsAvailable || {};

  return (
    <>
      <ClaimModal
        show={showClaimFormModal}
        handleClose={handleCloseClaimFormModal}
        actionType="edit"
        handleSubmit={handleClaimEditSave}
        existingClaim={claim}
        claimsRefetch={claimsRefetch}
      />
      <DocumentModal
        show={showDocumentModal}
        handleClose={handleCloseDocumentModal}
        claimId={claim ? claim.claimReferenceNo : ''}
        refetch={refetch}
        claimDocs={data?.getClaimDocuments}
      />

      <div className="general-menu" ref={myRef} onClick={handleClickInside}>
        <div className="menu"></div>

        <div className="items d-flex flex-column">
          {editClaimAccess && (
            <p onClick={handleShowClaimFormModal}>Edit Claim</p>
          )}
          {documentsAccess && (
            <p onClick={handleShowDocumentModal}>Upload Document</p>
          )}
          {!isUpdatingStatus && hasAccess && (
            <>
              {[
                [canSubmit, 'primary', 'submit', 'Submit'],
                [canDeny, 'danger', 'deny', 'Deny'],
                [canApprove, 'success', 'approve', 'Approve'],
                [canDisapprove, 'warning', 'disapprove', 'Disapprove'],
              ].map(
                (buttonProps, index) =>
                  buttonProps[0] && (
                    <Button
                      key={index}
                      variant={buttonProps[1]}
                      id={buttonProps[2]}
                      size="sm"
                      onClick={updateStatus}
                      disabled={loading ? true : false}
                    >
                      {buttonProps[3]}
                    </Button>
                  )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralMenu;

GeneralMenu.propTypes = {
  uniqueClickHandle: PropTypes.func,
  claimKey: PropTypes.number,
  claim: PropTypes.object,
  refetchAfterStatusEdit: PropTypes.func,
  claimsRefetch: PropTypes.func,
  isUpdatingStatus: PropTypes.bool,
  docsQueryObj: PropTypes.object,
};
