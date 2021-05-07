import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import TextInput from '../../../TextInput';
import './DocumentModal.css';
import '../../../ModalDetail.css';
import '../../../InputGroup.css';
import CLAIM from '../../../../api/mutations/Claim';
import { useMutation } from '@apollo/react-hooks';
import ClaimModalLoading from './ClaimModalLoading';
import FlashMessages from '../../../../lib/utils/FlashMessages';

import { useRole } from '../../../../hooks/RoleContext';
import { docNames } from '../../../../claimDocsCodes';

const initialFields = {
  docName: '',
  fileName: '',
};

export const documentsComplete = (requiredDocuments, submittedDocuments) => {
  return requiredDocuments.filter(
    (required) =>
      !submittedDocuments.find(
        (submitted) => submitted.documentName === required
      )
  ).length === 0
    ? true
    : false;
};

const DocumentModal = ({
  handleClose,
  show,
  claimId,
  refetch,
  claimDocs,
  existingDoc,
  forEdit,
  selectedDocName,
}) => {
  const { requiredDocuments, submittedDocuments } = claimDocs || {};

  const role = useRole();
  const { employeeId } = role.data.me || {};
  const [modalFields, setModalFields] = useState(initialFields);
  const [file, setFile] = useState();
  const [imageData, setImageData] = useState();
  const [uploadDocs] = useMutation(CLAIM.UPLOAD_DOCS);
  const [editDoc] = useMutation(CLAIM.EDIT_DOC);
  const [processing, setProcessing] = useState(false);
  const [progBar, setProgBar] = useState(0);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    async function Main() {
      const converted = await toBase64(file);
      setImageData(converted.slice(converted.indexOf('base64,') + 7));
    }
    file && Main();
  }, [file]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onModalClose = () => {
    handleClose();
    setModalFields(initialFields);
    setFile();
    setProcessing((prev) => (prev ? !prev : prev));
  };

  const uploadFile = async () => {
    setProcessing(true);
    setTimeout(() => {
      setProgBar((prev) => prev + 10);
    }, 500);
    const progBarInterval = setInterval(() => {
      setProgBar((prev) => prev + 10);
    }, 2000);

    try {
      var res;
      if (!existingDoc) {
        const uploadDocsData = {
          claims: {
            isDocumentComplete: documentsComplete(
              requiredDocuments,
              submittedDocuments
            ),
          },
          claimsReferenceNo: claimId,
          employeeId: employeeId,
          submittedDocuments: [
            {
              documentName: modalFields.docName,
              fileName: modalFields.fileName,
              fileType: `.${file.name.split('.').pop().toLowerCase()}`,
              fileImageData: imageData,
            },
          ],
        };
        console.log(uploadDocsData);
        const { data } = await uploadDocs({
          variables: uploadDocsData,
        });
        res = data.uploadDocument;
      } else {
        const editDocsData = {
          claims: {
            isDocumentComplete: documentsComplete(
              requiredDocuments,
              submittedDocuments
            ),
          },
          claimsReferenceNo: claimId,
          employeeId: employeeId,
          submittedDocuments: [
            {
              fileToUpdate: existingDoc.fileName,
              documentName: docNames.find(
                (doc) => doc.name === existingDoc.documentName
              )?.code,
              fileName: modalFields.fileName,
              fileType: !file
                ? existingDoc.fileType
                : `.${file.name.split('.').pop().toLowerCase()}`,
              fileImageData: imageData,
            },
          ],
        };
        console.log(editDocsData);
        const { data } = await editDoc({
          variables: editDocsData,
        });
        res = data.updateUploadDocument;
      }
      const { errors, message } = res;

      setProgBar(!errors ? 100 : 0);
      setTimeout(() => {
        if (!errors) {
          const docName = existingDoc
            ? existingDoc.documentName
            : docNames.find((doc) => doc.code === modalFields.docName).name;
          FlashMessages.success(
            `${docName} has been successfully ${
              existingDoc ? 'updated' : 'uploaded'
            }.`
          );
          onModalClose();
          refetch();
        } else {
          FlashMessages.errors(message);
        }
        setProcessing(false);
        setProgBar(0);
        clearInterval(progBarInterval);
      }, 1300);
    } catch (err) {
      console.log(err);
      FlashMessages.errors(err.message);
      setProcessing(false);
      setProgBar(0);
      clearInterval(progBarInterval);
    }
  };

  const handleInputChange = (e) => {
    const { value, id } = e.target;
    setModalFields((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const errorCheck = () => {
    const allowedFileTypes = ['.pdf', '.docx', '.jpg', '.png'];
    var hasError = false;
    var message = '';
    if (!imageData || !modalFields.docName || !modalFields.fileName) {
      hasError = true;
      message = 'Please supply all form fields.';
    } else if (
      !allowedFileTypes.includes(
        file
          ? `.${file.name.split('.').pop().toLowerCase()}`
          : existingDoc.fileType
      )
    ) {
      hasError = true;
      message = 'Invalid file type for upload.';
    }
    return {
      hasError,
      message,
    };
  };

  useEffect(() => {
    if (existingDoc) {
      console.log(
        docNames.find((doc) => doc.name === existingDoc.documentName)?.code
      );
      setModalFields({
        docName: docNames.find((doc) => doc.name === existingDoc.documentName)
          ?.code,
        fileName: existingDoc.fileName,
      });
      setImageData(existingDoc.fileImage);
    } else if (selectedDocName) {
      setModalFields((prev) => ({ ...prev, docName: selectedDocName }));
    }
  }, [existingDoc, selectedDocName]);

  return (
    <>
      <Modal show={show} onHide={onModalClose} size="lg">
        {processing && (
          <ClaimModalLoading
            progPercent={progBar}
            message={'Uploading Document...'}
          />
        )}
        <Modal.Body>
          <div className="modal-details">
            <div className="heading d-flex justify-content-end">
              <ion-icon name="close" onClick={onModalClose}></ion-icon>
            </div>
            <div className="document-detail d-flex flex-wrap">
              <div className="input-group">
                <label>Upload Document</label>
                <input
                  className="upload"
                  type="file"
                  id="myfile"
                  name="myfile"
                  onChange={handleFileChange}
                ></input>
                <p className="meta">
                  only PNG, JPG, DOCX and PDF with max size of 3 MB
                </p>
              </div>
              <div className="input-group">
                <label>Document Type</label>
                <select
                  className="input-select"
                  disabled={forEdit || selectedDocName}
                  onChange={handleInputChange}
                  id="docName"
                  value={modalFields.docName}
                >
                  <option value="" selected disabled hidden>
                    {'Choose Type'}
                  </option>
                  )
                  {requiredDocuments &&
                    docNames
                      .filter((doc) => requiredDocuments.includes(doc.name))
                      .map((_, i) => (
                        <option value={_.code} key={i}>
                          {_.name}
                        </option>
                      ))}
                </select>
              </div>
              <div className="edit-file d-flex align-items-center col-sm-12 col-md-12">
                <ion-icon className="icon" name="document-outline"></ion-icon>
                <TextInput
                  placeholder="e.g. photocopy-valid-id"
                  label="filename"
                  id="fileName"
                  value={modalFields.fileName}
                  handleChange={handleInputChange}
                />
              </div>
            </div>
            <div className="footer">
              <Button
                variant="primary"
                onClick={() => {
                  const { hasError, message } = errorCheck();
                  if (hasError) {
                    FlashMessages.errors(message);
                  } else {
                    uploadFile();
                  }
                }}
              >
                Upload
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DocumentModal;

DocumentModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  claimId: PropTypes.string,
  docName: PropTypes.string,
  refetch: PropTypes.func,
  requiredDocuments: PropTypes.array,
  claimDocs: PropTypes.object,
  existingDoc: PropTypes.object,
  forEdit: PropTypes.bool,
  selectedDocName: PropTypes.string,
};
