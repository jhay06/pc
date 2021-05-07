import React from 'react';
import Button from 'react-bootstrap/Button';
import DocumentList from './DocumentList';
import './ClaimMenu.css';
import './DocumentStatus.css';
import './DocumentList.css';
import './ListsContainer.css';

export const ClaimDocument = () => (
  <>
    <div className="document-status col-md-12 col-lg-12">
      <div className="d-flex align-items-center">
        <label>Status :</label>
        <p className="status -incomplete">Incomplete</p>
      </div>
      <div className="tasks">
        <Button variant="secondary" size="sm">
          Affected Body Parts
        </Button>
        <Button variant="secondary" size="sm">
          Police Report
        </Button>
        <Button variant="secondary" size="sm">
          Some More Document
        </Button>
      </div>
    </div>
    <div className="lists-container">
      <table className="table-container" hover>
        <tr className="customer-label">
          <th></th>
          <th>Document Type</th>
          <th>File Name</th>
          <th>Modified</th>
        </tr>
        <DocumentList
          icon="image"
          type="Company ID"
          filename="hardcopy-photo-companyid.png"
          modified="Fri, 05/07/18 - 10:24 AM"
        />
        <DocumentList
          icon="image"
          type="Company ID"
          filename="hardcopy-photo-companyid.png"
          modified="Fri, 05/07/18 - 10:24 AM"
        />
        <DocumentList
          icon="image"
          type="Company ID"
          filename="hardcopy-photo-companyid.png"
          modified="Fri, 05/07/18 - 10:24 AM"
        />
      </table>
    </div>
  </>
);

export default ClaimDocument;
