import { useCallback, useEffect, useState } from 'react';
import CUSTOMER from '../api/queries/Customer';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { formatISO } from 'date-fns';
import useFormValidate from './useFormValidate';
import useGetBranches from './useGetBranches';
import { benefitCodeName } from '../BenefitCodes';

const initialFormFields = {
  fullName: '',
  benefits: [],
  amountSettled: 0,
  customAmount: 0,
  dateFiled: formatISO(new Date(), { representation: 'date' }),
  branchCode: '',
  claimant: '',
  claimantContactNo: '',
  cocNumbers: [],
  submittedDocuments: [],
  address: '',
  dateOfBirth: '',
  dateOfLoss: formatISO(new Date(), { representation: 'date' }),
  payoutReferenceNumber: '',
  remarks: '',
  relationship: '',
  payoutBranch: '',
};

function useClaimModal(handleClose, setErrors, existingClaim) {
  const { id } = useParams();
  const { branches } = useGetBranches();
  const { data } = useQuery(CUSTOMER.COC_LIST, {
    variables: {
      limit: '1000',
      page: '1',
      customerNo: id,
    },
  });
  const [processing, setProcessing] = useState(false);
  const [newClaimFields, setNewClaimFields] = useState(initialFormFields);
  const [prefilled, setPrefilled] = useState();

  const [missingFieldsLabels] = useFormValidate(newClaimFields, existingClaim);

  useEffect(() => {
    if (data) {
      const { fullname, address, city, zipCode, dateOfBirth } =
        data.getCustomerCocList.customer || {};
      const { beneficiaryRelationship, beneficiaryName, beneficiaryContactNo } =
        data.getCustomerCocList.cocs[0] || {};

      const {
        amountSettled,
        benefits,
        branchCode,
        claimant,
        claimantContactNo,
        cocs,
        dateOfLoss,
        dateOfNotification,
        payoutBranch,
        payoutReferenceNumber,
        remarks,
        claimantRelationship,
      } = existingClaim || {};

      if (existingClaim) {
        setPrefilled({
          ...initialFormFields,
          fullName: fullname,
          benefits: benefits
            .map((item) => {
              const found = benefitCodeName.find(
                (benObj) =>
                  benObj.benefit === item.code &&
                  (benObj.benefitType
                    ? benObj.benefitType === item.benefitTypeName
                    : true)
              );
              return { ...found, benefitAmount: item.amount };
            })
            .filter((item) => item),
          amountSettled: Number(amountSettled),
          dateOfNotification: formatISO(new Date(dateOfNotification), {
            representation: 'date',
          }),
          branchCode: branchCode,
          claimant: claimant,
          claimantContactNo: claimantContactNo,
          address: `${address}, ${city}, ${zipCode}`,
          dateOfBirth: formatISO(new Date(dateOfBirth), {
            representation: 'date',
          }),
          cocNumbers: cocs,
          dateOfLoss: formatISO(new Date(dateOfLoss), {
            representation: 'date',
          }),
          payoutBranch: payoutBranch,
          payoutReferenceNumber: payoutReferenceNumber,
          remarks: remarks,
          relationship: claimantRelationship,
        });
      } else {
        setPrefilled({
          ...initialFormFields,
          fullName: fullname,
          claimant: beneficiaryName,
          claimantContactNo: beneficiaryContactNo,
          address: `${address}, ${city}, ${zipCode}`,
          dateOfBirth: formatISO(new Date(dateOfBirth), {
            representation: 'date',
          }),
          relationship: beneficiaryRelationship,
          branchCode: '',
        });
      }
    }
  }, [data, existingClaim, branches]);

  useEffect(() => {
    if (prefilled) {
      setNewClaimFields(prefilled);
    }
  }, [prefilled]);

  useEffect(() => {
    setNewClaimFields((prev) => ({
      ...prev,
      amountSettled:
        newClaimFields.benefits.reduce(
          (total, item) => Number(item.benefitAmount) + total,
          0
        ) *
        (newClaimFields.cocNumbers.length > 1
          ? newClaimFields.cocNumbers.length
          : 1),
    }));
  }, [newClaimFields.benefits, newClaimFields.cocNumbers]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewClaimFields((prev) => {
      return {
        ...prev,
        [id]:
          id === 'customAmount'
            ? Number(value) > 20000
              ? prev.customAmount
              : value
            : value,
      };
    });
  };

  const handleBenefitsChange = (e, myBenefitType) => {
    console.log(myBenefitType);
    const { id, checked } = e.target;
    console.log(id, checked);
    const benefitObj = benefitCodeName.find(
      (item) => item.benefit === id && item.benefitType === myBenefitType
    );
    if (benefitObj) {
      const newBenefits = checked
        ? [...newClaimFields.benefits, benefitObj]
        : newClaimFields.benefits.filter((item) => item.benefit !== id);
      setNewClaimFields((prev) => ({
        ...prev,
        benefits: newBenefits,
      }));
    }
  };

  useEffect(() => {
    setNewClaimFields((prev) => ({
      ...prev,
      benefits: newClaimFields.benefits.map((item) => {
        if (item.benefit === 'ADDB') {
          return {
            ...item,
            benefitAmount: newClaimFields.customAmount,
          };
        } else return item;
      }),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newClaimFields.customAmount]);

  useEffect(() => {
    if (!newClaimFields.benefits.find((_) => _.benefit === 'ADDB')) {
      setNewClaimFields((prev) => ({
        ...prev,
        customAmount: 0,
      }));
    }
  }, [newClaimFields.benefits]);

  const handleCocSelect = useCallback((selectedCocs) => {
    setNewClaimFields((prev) => ({
      ...prev,
      cocNumbers: selectedCocs,
    }));
  }, []);

  const onModalClose = () => {
    if (!processing) {
      setNewClaimFields(prefilled);
      setErrors([]);
      handleClose();
    }
  };

  return {
    newClaimFields,
    data,
    handleInputChange,
    handleBenefitsChange,
    processing,
    setProcessing,
    onModalClose,
    missingFieldsLabels,
    handleCocSelect,
  };
}

export default useClaimModal;
