import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import InfoDetail from './InfoDetail';
import '../../ModalDetail.css';

import useAddClaim from '../../../hooks/useAddClaim';
import useClaimModal from '../../../hooks/useClaimModal';
import ClaimModalLoading from './claims/ClaimModalLoading';

const ClaimModal = ({
  handleClose,
  show,
  actionType,
  existingClaim,
  claimsRefetch,
}) => {
  const [errors, setErrors] = useState([]);
  const {
    newClaimFields,
    data,
    handleInputChange,
    handleBenefitsChange,
    processing,
    setProcessing,
    onModalClose,
    missingFieldsLabels,
    handleCocSelect,
  } = useClaimModal(handleClose, setErrors, existingClaim);

  const [submitClaim, progBar] = useAddClaim(
    setProcessing,
    data,
    newClaimFields,
    onModalClose,
    existingClaim,
    claimsRefetch
  );
  return (
    <>
      <Modal show={show} onHide={onModalClose} size="lg">
        {processing && (
          <ClaimModalLoading
            progPercent={progBar}
            message={
              actionType === 'add' ? 'Adding new claim.' : 'Editing claim.'
            }
          />
        )}
        <Modal.Body>
          <div className="modal-details">
            <div className="heading d-flex justify-content-between">
              <h6>{existingClaim ? 'EDIT CLAIM' : 'ADD CLAIM'}</h6>
              <ion-icon name="close" onClick={onModalClose}></ion-icon>
            </div>
            {existingClaim && (
              <div className="heading d-flex justify-content-between">
                <h6>{existingClaim.claimReferenceNo}</h6>
              </div>
            )}

            <InfoDetail
              actionType={actionType}
              handleChange={handleInputChange}
              handleBenefitsChange={handleBenefitsChange}
              handleCocSelect={handleCocSelect}
              formFields={newClaimFields}
              existingClaim={existingClaim}
              errors={errors}
            />
            <div className="footer col-md-12">
              <Button variant="light" onClick={onModalClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setErrors(missingFieldsLabels);
                  missingFieldsLabels.length === 0 && submitClaim();
                }}
                disabled={processing ? true : false}
              >
                {processing ? 'Processing' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClaimModal;

ClaimModal.propTypes = {
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  actionType: PropTypes.string,
  existingClaim: PropTypes.object,
  claimsRefetch: PropTypes.func,
};
