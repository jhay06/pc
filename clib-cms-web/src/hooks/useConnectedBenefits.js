import { coverageTypes } from '../components/pages/customer/CoverageLabel';

function useConnectedBenefits() {
  const isDisabled = (benefitsArray, id) => {
    var enabledBenefits = [];
    if (benefitsArray.includes('Accidental Death Benefit')) {
      enabledBenefits = coverageTypes.filter((benefit) =>
        [
          'Accidental Death Benefit',
          'Emergency Expense Benefit (Accident)',
          'Fire Cash Assistance',
        ].includes(benefit)
      );
      return enabledBenefits.includes(id) ? false : true;
    } else if (
      benefitsArray.includes('Death Benefit (Accidental or Sickness)')
    ) {
      const emergencyBenefits = [
        'Emergency Expense Benefit (Accident)',
        'Emergency Expense Benefit (Sickness)',
      ];
      const filteredEmergencies = emergencyBenefits.filter((em) =>
        benefitsArray.includes(em)
      );
      enabledBenefits = coverageTypes.filter((benefit) =>
        [
          'Death Benefit (Accidental or Sickness)',
          ...(filteredEmergencies.length === 0
            ? emergencyBenefits
            : filteredEmergencies),
        ].includes(benefit)
      );
      return enabledBenefits.includes(id) ? false : true;
    } else if (benefitsArray.includes('Accidental Disablement Benefit')) {
      enabledBenefits = coverageTypes.filter((benefit) =>
        [
          'Accidental Disablement Benefit',
          'Emergency Expense Benefit (Accident)',
          'Fire Cash Assistance',
        ].includes(benefit)
      );
      return enabledBenefits.includes(id) ? false : true;
    } else if (benefitsArray.includes('Accidental Dismemberment Benefit')) {
      enabledBenefits = coverageTypes.filter((benefit) =>
        [
          'Accidental Dismemberment Benefit',
          'Emergency Expense Benefit (Accident)',
          'Fire Cash Assistance',
        ].includes(benefit)
      );
      return enabledBenefits.includes(id) ? false : true;
    } else if (
      benefitsArray.includes('Murder and Unprovoked Assault Benefit')
    ) {
      enabledBenefits = coverageTypes.filter((benefit) =>
        [
          'Murder and Unprovoked Assault Benefit',
          'Emergency Expense Benefit (Accident)',
        ].includes(benefit)
      );
      return enabledBenefits.includes(id) ? false : true;
    } else if (benefitsArray.includes('Fire Cash Assistance')) {
      enabledBenefits = coverageTypes.filter(
        (benefit) =>
          ![
            'Murder and Unprovoked Assault Benefit',
            'Emergency Expense Benefit (Sickness)',
          ].includes(benefit)
      );
      return enabledBenefits.includes(id) ? false : true;
    } else if (benefitsArray.includes('Emergency Expense Benefit (Accident)')) {
      enabledBenefits = coverageTypes.filter(
        (benefit) => !['Emergency Expense Benefit (Sickness)'].includes(benefit)
      );
      return enabledBenefits.includes(id) ? false : true;
    } else if (benefitsArray.includes('Emergency Expense Benefit (Sickness)')) {
      enabledBenefits = coverageTypes.filter((benefit) =>
        [
          'Emergency Expense Benefit (Sickness)',
          'Death Benefit (Accidental or Sickness)',
        ].includes(benefit)
      );
      return enabledBenefits.includes(id) ? false : true;
    }
    return enabledBenefits.length > 0
      ? enabledBenefits.includes(id)
        ? false
        : true
      : false;
  };

  const benefitSet = (addedBenefitId) => {
    var returnedArray = [];
    switch (addedBenefitId) {
      case 'Accidental Death Benefit':
        returnedArray = [
          'Accidental Death Benefit',
          'Death Benefit (Accidental or Sickness)',
        ];
        break;

      case 'Murder and Unprovoked Assault Benefit':
        returnedArray = [
          'Murder and Unprovoked Assault Benefit',
          'Death Benefit (Accidental or Sickness)',
        ];
        break;

      case 'Accidental Dismemberment Benefit':
        returnedArray = ['Accidental Dismemberment Benefit'];
        break;

      case 'Accidental Disablement Benefit':
        returnedArray = ['Accidental Disablement Benefit'];
        break;

      case 'Death Benefit (Accidental or Sickness)':
        returnedArray = ['Death Benefit (Accidental or Sickness)'];
        break;

      case 'Fire Cash Assistance':
        returnedArray = ['Fire Cash Assistance'];
        break;

      case 'Emergency Expense Benefit (Accident)':
        returnedArray = ['Emergency Expense Benefit (Accident)'];
        break;

      case 'Emergency Expense Benefit (Sickness)':
        returnedArray = ['Emergency Expense Benefit (Sickness)'];
        break;

      default:
        break;
    }
    return returnedArray;
  };

  return [isDisabled, benefitSet];
}

export default useConnectedBenefits;
