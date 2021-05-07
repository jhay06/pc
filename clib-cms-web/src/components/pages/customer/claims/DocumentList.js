import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DeleteModal from './DeleteModal';
import DocumentModal from './DocumentModal';
import './DocumentList.css';
import useRoleRestrict from '../../../../hooks/useRoleRestrict';
import { saveAs } from 'file-saver';

const mimeTypes = [
  {
    suffix: '.pdf',
    mime: 'application/pdf',
  },
  {
    suffix: '.png',
    mime: 'image/png',
  },
  {
    suffix: '.jpg',
    mime: 'image/jpeg',
  },
  {
    suffix: 'docx',
    mime: 'application/octet-stream',
  },
];

const DocumentList = ({
  icon,
  docObj,
  claimDocs,
  claimReferenceNo,
  refetch,
  claimsStatus,
}) => {
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
  const handleShowDeleteFormModal = () => setShowDeleteFormModal(true);
  const handleCloseDeleteFormModal = () => setShowDeleteFormModal(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const handleShowDocumentModal = () => setShowDocumentModal(true);
  const handleCloseDocumentModal = () => setShowDocumentModal(false);
  const { restrictClaimEditDocsCRUD } = useRoleRestrict();

  const convertBase64ToFile = (base64String, fileName) => {
    const addedPrefix = `data:${
      mimeTypes.find((mime) => mime.suffix === docObj.fileType)?.mime
    };base64,${base64String}`;

    let arr = addedPrefix.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    let file = new File([uint8Array], fileName, { type: mime });
    return file;
  };

  const downloadBase64Data = (base64String, fileName) => {
    let file = convertBase64ToFile(base64String, fileName);
    saveAs(file, fileName);
  };

  return (
    <>
      <DocumentModal
        show={showDocumentModal}
        handleClose={handleCloseDocumentModal}
        existingDoc={docObj}
        claimId={claimReferenceNo}
        claimDocs={claimDocs}
        refetch={refetch}
        forEdit
      />

      <DeleteModal
        show={showDeleteFormModal}
        handleClose={handleCloseDeleteFormModal}
        claimId={claimReferenceNo}
        existingDoc={docObj}
        refetch={refetch}
      />
      <tr className="document-list">
        <td>
          <ion-icon name={icon}></ion-icon>
        </td>
        <td className="type">{docObj.documentName}</td>
        <td className="filename">{docObj.fileName}</td>
        <td>{docObj.fileType}</td>
        <td>
          <DropdownButton size="sm" alignRight id="dropdown-menu-align-right">
            {!restrictClaimEditDocsCRUD(claimsStatus) && (
              <>
                <Dropdown.Item eventKey="1" onClick={handleShowDocumentModal}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={handleShowDeleteFormModal}>
                  Delete
                </Dropdown.Item>
              </>
            )}

            <Dropdown.Item
              eventKey="2"
              onClick={() =>
                downloadBase64Data(docObj.fileImage, docObj.fileName)
              }
            >
              Download file
            </Dropdown.Item>
          </DropdownButton>
        </td>
      </tr>
    </>
  );
};

export default DocumentList;

DocumentList.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  type: PropTypes.string,
  filename: PropTypes.string,
  modified: PropTypes.string,
  refetch: PropTypes.func,
  claimsStatus: PropTypes.string,
  docObj: PropTypes.object,
  claimDocs: PropTypes.array,
  claimReferenceNo: PropTypes.string,
};
