import React from 'react';
import Button from 'react-bootstrap/Button';
import UserDetail from './UserDetail';
import './ModalContainer.css';

export const UserModal = () => (
  <>
    <div className="modal-container">
      <div className="overlay"></div>
      <div className="modal-details">
        <div className="heading d-flex justify-content-between">
          <h6>PMAX1001514</h6>
          <ion-icon name="close"></ion-icon>
        </div>
        <div className="input-container">
          <UserDetail />
        </div>
        <div className="footer">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </div>
      </div>
    </div>
  </>
);

export default UserModal;
