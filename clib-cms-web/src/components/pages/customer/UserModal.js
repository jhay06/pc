import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import UserDetail from '../../UserDetail';
import '../../ModalDetail.css';

const UserModal = ({ handleClose, show, userDetails }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <div className="modal-details">
            <div className="heading d-flex justify-content-end">
              <ion-icon name="close" onClick={handleClose}></ion-icon>
            </div>
            <div className="input-container">
              <UserDetail data={userDetails} />
            </div>
            <div className="footer">
              <Button variant="light" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;

UserModal.propTypes = {
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  userDetails: PropTypes.shape({
    fullname: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    employeeId: PropTypes.string,
    sectionUnit: PropTypes.string,
    immediateHead: PropTypes.string,
    role: PropTypes.object,
    region: PropTypes.object,
  }),
};
