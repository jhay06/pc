import React from 'react';
import Button from 'react-bootstrap/Button';
import './ModalContainer.css';
import './NotifModal.css';

export const ReportModal = () => (
  <>
    <div className="modal-container">
      <div className="notif-modal -report d-flex flex-column justify-content-center align-items-center">
        <ion-icon className="download" name="cloud-download-outline"></ion-icon>
        <h5>Downloading Report.....</h5>
        <p>You are downloading reports from Claims Management System.</p>
        <div className="action">
          <Button variant="light">Cancel</Button>
        </div>
      </div>
    </div>
  </>
);

export default ReportModal;
