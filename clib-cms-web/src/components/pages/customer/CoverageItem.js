import React from 'react';
import PropTypes from 'prop-types';
import '../../InputGroup.css';

export const CoverageItem = ({
  coverage,
  covId,
  cbLocation,
  claimValues,
  value,
  checkOnModal,
  benefitTypeId,
}) => {
  const forEditing = cbLocation === 'ClaimInfo' ? false : true;

  var oneOfEach = false;
  const benefitsWithDoubles = ['ADDB', 'ECA'];
  if (
    benefitsWithDoubles.includes(covId) &&
    value?.find(
      (benefit) =>
        benefit.benefit === covId && benefit.benefitType !== benefitTypeId
    )
  ) {
    oneOfEach = true;
  }
  return (
    <>
      {(forEditing || claimValues) && (
        <div className="col-md-4">
          <div className="coverage-item d-flex align-items-start">
            {forEditing && (
              <input
                type="checkbox"
                id={covId}
                onChange={(e) => checkOnModal(e, benefitTypeId)}
                checked={value.find(
                  (benefit) =>
                    benefit.benefit === covId &&
                    benefit.benefitType === benefitTypeId
                )}
                disabled={oneOfEach}
              />
            )}
            <p className="coverage" htmlFor="coverage">
              {!forEditing && <span> &bull; </span>}
              {coverage}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverageItem;

CoverageItem.propTypes = {
  coverage: PropTypes.string,
  covId: PropTypes.string,
  cbLocation: PropTypes.string,
  value: PropTypes.array,
  checkOnModal: PropTypes.func,
  claimValues: PropTypes.string,
  benefitTypeId: PropTypes.string,
};
