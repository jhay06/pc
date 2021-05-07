import React from 'react';
import { Button } from 'react-bootstrap';
import DateInput from '../../DateInput';
import SelectInput from '../../SelectInput';
import { CSVLink } from 'react-csv';
import './ReportsPage.css';

const headers = [
  { label: 'Claims Reference Number', key: 'claimsReferenceNumber' },
  { label: 'Date Filed (system generated with CRN', key: 'dateFiled' },
  { label: 'Date Received by CLIS', key: 'dateReceived' },
  {
    label: 'Source of Claim Notification (Branch/Direct)',
    key: 'sourceOfNotification',
  },
  { label: 'Branch Code', key: 'branchCode' },
  { label: 'Product Type', key: 'productType' },
  { label: 'Category', key: 'category' },
  { label: 'Type of Claim', key: 'typeOfClaim' },
  { label: 'DateOfLoss', key: 'dateOfLoss' },
  { label: 'Branch Transaction Type', key: 'transactionType' },
  { label: 'Name of Claimant', key: 'nameOfClaimant' },
  { label: 'Claimant Contact Number', key: 'claimantContactNo' },
  { label: 'Claimant Relationship', key: 'claimantRelationship' },
  { label: 'Net Amount Payable', key: 'netAmountPayable' },
  { label: 'Approved/Denied/Ex-Gratia/Escalated', key: 'status' },
  { label: 'Approver', key: 'approver' },
  { label: 'Insurer', key: 'insurer' },
  { label: 'Payout Reference Number', key: 'payoutReferenceNumber' },
  { label: 'Date of Payout', key: 'dateOfPayout' },
  { label: 'Payout Branch', key: 'payoutBranch' },
  { label: 'Remarks', key: 'remarks' },
  { label: 'CreatedBy', key: 'createdBy' },
  { label: 'DateCreated', key: 'dateCreated' },
  { label: 'UpdatedBy', key: 'updatedBy' },
  { label: 'DateUpdated', key: 'dateUpdated' },
  { label: 'DeletedBy', key: 'deletedBy' },
  { label: 'DateDeleted', key: 'dateDeleted' },
];

const data = [
  {
    claimsReferenceNumber: 'ClaimsReferenceNumber',
    dateFiled: 'DateFiled',
    dateReceived: 'Date Created (Iclick) Date Created (CMS)',
    sourceOfNotification: 'Source of Claim Notification (Branch/Direct)',
    branchCode: 'BranchCode ',
    productType: 'Product',
    category: 'Category',
    typeOfClaim: 'Benefit',
    dateOfLoss: 'DateOfLoss',
    transactionType: 'Transaction Source/Type',
    nameOfClaimant: 'Claimant',
    claimantContactNo: 'Claimant Contact Number',
    claimantRelationship: 'Claimant Relationship',
    netAmountPayable: 'AmountSettled',
    status: 'ClaimsStatus',
    approver: 'ApprovedBy',
    insurer: 'Provider',
    payoutReferenceNumber: 'PayoutReferenceNumber',
    dateOfPayout: ' DateClaimed',
    payoutBranch: 'PayoutBranch',
    remarks: 'Remarks',
    createdBy: 'CreatedBy',
    dateCreated: 'DateCreated',
    updatedBy: 'UpdatedBy',
    dateUpdated: 'DateUpdated',
    deletedBy: 'DeletedBy',
    dateDeleted: 'DateDeleted',
  },
];

function ReportsPage() {
  return (
    <>
      <div className="lists-container">
        <div className="label-title d-flex align-items-center justify-content-between">
          <div className="label-side d-flex reports-title">
            <h4 className="label">Reports</h4>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          <SelectInput
            actionType="reports"
            id="claimsLeadHandler"
            value={``}
            label="Claims Lead Handler"
          />
          <SelectInput
            actionType="reports"
            id="typeOfClaimBenefit"
            value={``}
            label="Type of Claim / Benefit"
          />
          <DateInput id="from" value={new Date()} label="From" />
          <DateInput id="to" value={new Date()} label="To" />
          <SelectInput
            actionType="reports"
            id="claimStatus"
            value={``}
            label="Claim Status"
          />
          <CSVLink
            className="generate-btn-container"
            data={data}
            headers={headers}
          >
            <Button variant="primary" className="generate-btn">
              <ion-icon icon="newspaper-outline" class="btn-icon "></ion-icon>
              Generate
            </Button>
          </CSVLink>
        </div>
      </div>
    </>
  );
}

export default ReportsPage;
