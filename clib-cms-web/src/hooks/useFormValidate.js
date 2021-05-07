function useFormValidate(newClaimFields, existingClaim) {
  let fromForm = newClaimFields;

  const missingFields = Object.entries(fromForm).filter((propArray) => {
    const [formLabel, formInput] = propArray;

    return (
      [
        'fullName',
        'benefits',
        'claimant',
        'claimantContactNo',
        'cocNumbers',
        'address',
        'dateOfBirth',
        'relationship',
        existingClaim && 'payoutBranch',
        existingClaim && 'dateOfLoss',
        existingClaim && 'payoutReference',
      ].includes(formLabel) &&
      (typeof formInput === 'string' || !formInput
        ? formInput === '' || !formInput
        : formInput.length === 0)
    );
  });

  const missingFieldsLabels = missingFields.map((field) => field[0]);

  return [missingFieldsLabels];
}

export default useFormValidate;
