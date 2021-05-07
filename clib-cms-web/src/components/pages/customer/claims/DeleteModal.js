import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Spinner } from 'react-bootstrap';
import '../../../NotifModal.css';
import CLAIM from '../../../../api/mutations/Claim';
import FlashMessages from '../../../../lib/utils/FlashMessages';
import { useRole } from '../../../../hooks/RoleContext';
import { useMutation } from '@apollo/react-hooks';
import { docNames } from '../../../../claimDocsCodes';

const DeleteModal = ({ handleClose, show, claimId, existingDoc, refetch }) => {
  const [deleteDoc] = useMutation(CLAIM.DELETE_DOC);
  const { data } = useRole();
  const { employeeId } = data.me;
  const [processing, setProcessing] = useState(false);

  const deleteDocument = async () => {
    setProcessing(true);
    const { fileName, documentName } = existingDoc;
    try {
      const deleteData = {
        employeeId: employeeId,
        submittedDocuments: [
          {
            documentName: docNames.find((doc) => doc.name === documentName)
              ?.code,
            fileName: fileName,
          },
        ],
        claimsReferenceNo: claimId,
      };
      const res = await deleteDoc({
        variables: deleteData,
      });
      if (res.data) {
        FlashMessages.success(`${documentName} has been deleted.`);
      } else {
        FlashMessages.errors('API error');
        console.log(res.errors);
      }
    } catch (err) {
      console.log(err);
      FlashMessages.errors(err.message);
    }
    setProcessing(false);
    handleClose();
    refetch();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          if (!processing) {
            handleClose();
          }
        }}
        size="lg"
      >
        <Modal.Body>
          <div>
            <div className="notif-modal -delete d-flex flex-column justify-content-center align-items-center">
              <ion-icon
                className="close"
                name="close-circle-outline"
              ></ion-icon>

              <h5 className="-delete">Are you sure?</h5>
              <p>
                Do you really want to delete this record? This process cannot be
                undone.
              </p>
              <div className="action">
                <Button
                  variant="light"
                  onClick={handleClose}
                  disabled={processing}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={deleteDocument}
                  disabled={processing}
                >
                  {processing ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    'Delete'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  claimId: PropTypes.string,
  existingDoc: PropTypes.object,
  refetch: PropTypes.func,
};
