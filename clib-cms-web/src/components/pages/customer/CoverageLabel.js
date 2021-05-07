import React from 'react';
import PropTypes from 'prop-types';
import CoverageItem from './CoverageItem';
import './ContentLabel.css';
import { benefitCodeName } from '../../../BenefitCodes';

export const coverageTypes = [
  'Accidental Death Benefit',
  'Death Benefit (Accidental or Sickness)',
  'Accidental Disablement Benefit',
  'Accidental Dismemberment Benefit',
  'Murder and Unprovoked Assault Benefit',
  'Fire Cash Assistance',
  'Emergency Expense Benefit (Accident)',
  'Emergency Expense Benefit (Sickness)',
];

export const CoverageLabel = ({
  label,
  cbLocation,
  value,
  handleChange,
  benefits,
  errors,
}) => {
  return (
    <>
      <div className={`input-group col-sm-12 ${errors ? 'error-input' : ''}`}>
        <label>{label}</label>
        <div className="coverage-items d-flex flex-wrap align-items-start">
          {cbLocation === 'ClaimInfo'
            ? benefits.map((benefit, index) => {
                const validBenefit = benefitCodeName.find(
                  (item) =>
                    item.benefit === benefit.code &&
                    (item.benefitType
                      ? item.benefitType === benefit.benefitTypeName
                      : true)
                );
                return (
                  <CoverageItem
                    key={index}
                    coverage={
                      validBenefit ? validBenefit.description : 'Invalid Data'
                    }
                    covId={benefit.code}
                    cbLocation={cbLocation}
                    claimValues={benefit.code}
                  />
                );
              })
            : benefitCodeName.map((coverage, index) => {
                return (
                  <CoverageItem
                    key={index}
                    coverage={coverage.description}
                    covId={coverage.benefit}
                    cbLocation={cbLocation}
                    value={value}
                    checkOnModal={handleChange}
                    benefitTypeId={coverage.benefitType}
                  />
                );
              })}
        </div>
        {errors?.map((error, i) => (
          <p
            key={i}
            style={{ textAlign: 'center' }}
            className="error-message-form"
          >
            {error}
          </p>
        ))}
      </div>
    </>
  );
};

export default CoverageLabel;

CoverageLabel.propTypes = {
  label: PropTypes.string,
  cbLocation: PropTypes.string,
  value: PropTypes.array,
  handleChange: PropTypes.func,
  benefits: PropTypes.array,
  errors: PropTypes.array,
  id: PropTypes.string,
};
