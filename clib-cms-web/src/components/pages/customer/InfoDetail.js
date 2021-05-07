import React from 'react';
import TextInput from '../../TextInput';
import SelectInput from '../../SelectInput';
import DateInput from '../../DateInput';
import COCInput from './COCInput';
import CoverageLabel from './CoverageLabel';
import PropTypes from 'prop-types';
import useGetBranches from '../../../hooks/useGetBranches';
import { format } from 'date-fns';

export const InfoDetail = ({
  actionType,
  formFields,
  handleChange,
  handleBenefitsChange,
  handleCocSelect,
  errors,
  existingClaim,
}) => {
  const {
    fullName,
    amountSettled,
    branchCode,
    claimant,
    claimantContactNo,
    address,
    dateOfBirth,
    dateOfLoss,
    remarks,
    relationship,
    payoutBranch,
    benefits,
    cocNumbers,
    customAmount,
    payoutReferenceNumber,
    dateFiled,
  } = formFields;
  const { branches } = useGetBranches();
  const { internalClaimsStatus } = existingClaim || {};
  const formattedInternalStatus = internalClaimsStatus
    ? internalClaimsStatus === 'NOT AVAILABLE'
      ? 'Not Applicable'
      : internalClaimsStatus
    : 'Not Applicable';

  const checkRequiredFieldError = (label, id) => {
    return errors.includes(id) ? [`${label} is a required field.`] : null;
  };

  return (
    <>
      <div className="info-detail d-flex flex-wrap">
        <TextInput
          handleChange={handleChange}
          id="amountSettled"
          value={amountSettled}
          label="Total Settlement Amount"
          errors={checkRequiredFieldError('Settlement Amount', 'amountSettled')}
          benefits={benefits}
        />
        <TextInput
          handleChange={handleChange}
          id="customAmount"
          value={benefits.find((_) => _.benefit === 'ADDB') ? customAmount : 0}
          label="AD&D Amount"
          errors={checkRequiredFieldError('AD&D Amount', 'customAmount')}
          benefits={benefits}
          disabled={benefits.find((_) => _.benefit === 'ADDB') ? false : true}
        />
        <COCInput
          handleCocSelect={handleCocSelect}
          id="cocNumbers"
          value={cocNumbers}
          label="List of COCs"
          errors={checkRequiredFieldError('List of COCs', 'cocNumbers')}
          actionType={actionType}
          benefits={benefits}
        />
        <TextInput
          handleChange={handleChange}
          id="fullName"
          value={fullName}
          label="fullname"
          errors={checkRequiredFieldError('fullname', 'fullName')}
        />
        <DateInput
          handleChange={handleChange}
          id="dateOfBirth"
          value={dateOfBirth}
          label="Date of Birth"
          errors={checkRequiredFieldError('Date of Birth', 'dateOfBirth')}
          disabled
        />
        <TextInput
          handleChange={handleChange}
          id="address"
          value={address}
          label="Complete Address"
          errors={checkRequiredFieldError('Complete Address', 'address')}
          fullWidth
        />
        <TextInput
          handleChange={handleChange}
          id="claimant"
          value={claimant}
          label="Beneficiary"
          errors={checkRequiredFieldError('Beneficiary', 'claimant')}
        />
        <TextInput
          handleChange={handleChange}
          id="relationship"
          value={relationship}
          label="Relationship to Owner"
          errors={checkRequiredFieldError(
            'Relationship to Owner',
            'relationship'
          )}
        />
        <TextInput
          handleChange={handleChange}
          id="claimantContactNo"
          value={claimantContactNo && claimantContactNo.toString()}
          label="Contact Number"
          errors={checkRequiredFieldError(
            'Contact Number',
            'claimantContactNo'
          )}
        />
        <CoverageLabel
          label="Coverage Type"
          errors={checkRequiredFieldError('Coverage Type', 'benefits')}
          cbLocation={actionType === 'add' ? 'NA' : 'InfoDetail'}
          value={benefits}
          handleChange={handleBenefitsChange}
          id="benefits"
        />
        <SelectInput
          handleChange={handleChange}
          id="branchCode"
          value={branchCode}
          label="CL Branch"
          errors={checkRequiredFieldError('CL Branch', 'branchCode')}
          actionType={actionType}
          options={
            branches
              ? branches.map((branch) => ({
                  name: branch.name,
                  value: branch.code,
                }))
              : []
          }
        />
        <DateInput
          handleChange={handleChange}
          id="dateOfLoss"
          value={dateOfLoss}
          refDate={dateFiled}
          label="Date of Loss"
          errors={checkRequiredFieldError('Date of Loss', 'dateOfLoss')}
        />
        <DateInput
          handleChange={handleChange}
          id="dateOfNotification"
          value={
            actionType === 'add' ? format(new Date(), 'yyyy-MM-dd') : dateFiled
          }
          label="Date of Notification"
          errors={checkRequiredFieldError(
            'Date of Notification',
            'dateOfNotification'
          )}
          disabled
        />
        <SelectInput
          handleChange={handleChange}
          id="payoutBranch"
          value={payoutBranch}
          label="Payout Branch"
          errors={checkRequiredFieldError('Payout Branch', 'payoutBranch')}
          actionType={actionType}
          options={
            branches
              ? branches.map((branch) => ({
                  name: branch.name,
                  value: branch.code,
                }))
              : []
          }
        />
        <TextInput
          handleChange={handleChange}
          id="payoutReferenceNumber"
          value={payoutReferenceNumber}
          label="Payout Reference No."
          errors={checkRequiredFieldError(
            'Payout Reference No.',
            'payoutReferenceNumber'
          )}
          actionType={actionType}
        />
        <TextInput
          id="internalClaimStatus"
          value={formattedInternalStatus}
          label="Internal Claim Status"
          disabled
        />

        <TextInput
          handleChange={handleChange}
          id="remarks"
          value={remarks}
          label="Remarks"
          errors={checkRequiredFieldError('Remarks', 'remarks')}
          fullWidth
        />
      </div>
    </>
  );
};

export default InfoDetail;

InfoDetail.propTypes = {
  actionType: PropTypes.string,
  resetFields: PropTypes.func,
  formFields: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.array,
  handleCocSelect: PropTypes.func,
  handleBenefitsChange: PropTypes.func,
  existingClaim: PropTypes.object,
};
