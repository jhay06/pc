import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './NotifModal.css';

const DeleteConfirmation = ({ show, handleClose, handleSubmit }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <div className="notif-modal flex-column d-flex align-items-center">
            <ion-icon className="close" name="close-circle-outline"></ion-icon>
            <h3>Are you sure?</h3>
            <p>
              Do you really want to delete this record? This process cannot be
              undone.
            </p>

            <div className="action d-flex">
              <Button variant="light" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleSubmit}>
                Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;

DeleteConfirmation.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
