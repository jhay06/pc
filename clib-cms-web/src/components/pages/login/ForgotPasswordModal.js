import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import TextInput from '../../TextInput';
import '../../ModalContainer.css';
import '../../NotifModal.css';

const ForgotPasswordModal = ({ handleSubmit, handleClose, show }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <div>
            <div className="notif-modal d-flex flex-column justify-content-center align-items-center">
              <ion-icon className="lock" name="lock-closed-outline"></ion-icon>

              <h5 className="-delete">Reset Password</h5>
              <p>
                Once you enter your email we will send you a confirmation on
                your email. Thank you!
              </p>
              <TextInput label="Email" />
              <div className="action">
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;

ForgotPasswordModal.propTypes = {
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
};
