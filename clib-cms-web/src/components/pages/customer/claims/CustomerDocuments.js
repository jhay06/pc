import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import DocumentList from './DocumentList';
import ErrorMessage from '../../../ErrorMessage';
import './DocumentStatus.css';
import './CustomerDocuments.css';
import CustomersLoading from '../../../CustomersLoading';
import PropTypes from 'prop-types';
import DocumentModal, { documentsComplete } from './DocumentModal';
import { NetworkStatus } from 'apollo-client';
import { docNames } from '../../../../claimDocsCodes';
import useRoleRestrict from '../../../../hooks/useRoleRestrict';

const CustomerDocuments = ({
  claimReferenceNo,
  claimsStatus,
  docsQueryObj,
}) => {
  const { data, loading, error, networkStatus, refetch } = docsQueryObj;
  const [chosenCode, setChosenCode] = useState('');
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const { restrictClaimEditDocsCRUD } = useRoleRestrict();

  const handleShowDocumentModal = (e) => {
    const { id } = e.target;
    const found = docNames.find((doc) => doc.name === id);
    setChosenCode(found.code);
    setShowDocumentModal(true);
  };

  const handleCloseDocumentModal = () => setShowDocumentModal(false);

  const { requiredDocuments, submittedDocuments } =
    (data && data.getClaimDocuments) || {};

  const isComplete = data
    ? documentsComplete(requiredDocuments, submittedDocuments)
    : false;

  return (
    <>
      <DocumentModal
        show={showDocumentModal}
        handleClose={handleCloseDocumentModal}
        claimId={claimReferenceNo ? claimReferenceNo : ''}
        selectedDocName={chosenCode}
        refetch={refetch}
        claimDocs={data?.getClaimDocuments}
      />
      <div className="document-status mb-3">
        <div className="d-flex align-items-center">
          <label>Status :</label>
          <p className={`status ${isComplete ? '-complete' : '-incomplete'}`}>
            {isComplete ? 'COMPLETE' : 'INCOMPLETE'}
          </p>
        </div>
        <div className="tasks">
          {data &&
            requiredDocuments.map((doc, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                id={doc}
                onClick={handleShowDocumentModal}
                disabled={restrictClaimEditDocsCRUD(claimsStatus)}
              >
                {doc}
              </Button>
            ))}
        </div>
      </div>
      {(loading || networkStatus === NetworkStatus.refetch) && (
        <div className="cust-sidebar-loading">
          <CustomersLoading />
        </div>
      )}
      {error && (
        <ErrorMessage
          icon="document-text-outline"
          meta={error.message.slice(14)}
        />
      )}
      {data && networkStatus !== NetworkStatus.refetch && (
        <table className="customer-documents">
          <thead>
            <tr className="customer-label">
              <th></th>
              <th>Document Type</th>
              <th>File Name</th>
              <th>File Type</th>
            </tr>
          </thead>
          <tbody>
            {submittedDocuments.map((doc, index) => {
              return (
                <DocumentList
                  key={index}
                  icon="document"
                  docObj={doc}
                  refetch={refetch}
                  claimsStatus={claimsStatus}
                  claimDocs={data?.getClaimDocuments}
                  requiredDocuments={requiredDocuments}
                  claimReferenceNo={claimReferenceNo}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CustomerDocuments;

CustomerDocuments.propTypes = {
  claimReferenceNo: PropTypes.string,
  docsQueryObj: PropTypes.object,
  claimsStatus: PropTypes.string,
};
