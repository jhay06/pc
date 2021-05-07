import CUSTOMER from '../api/queries/Customer';
import CLAIM from '../api/mutations/Claim';
import CLAIMDOC from '../api/queries/Claim';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import FlashMessages from '../lib/utils/FlashMessages';
import { useState } from 'react';
import { format } from 'date-fns';
import _ from 'lodash';
import { useRole } from './RoleContext';
import { documentsComplete } from '../components/pages/customer/claims/DocumentModal';

function useAddClaim(
  setProcessing,
  data,
  newClaimFields,
  onModalClose,
  existingClaim,
  claimsRefetch
) {
  const { claimReferenceNo, claimsStatus } = existingClaim || {};
  const { id } = useParams();
  const { refetch: addClaimRefetch } = useQuery(CUSTOMER.CLAIMS, {
    variables: {
      limit: '1000',
      page: '1',
      customerNo: id,
    },
  });
  const { data: docsData } = useQuery(CLAIMDOC.DOCUMENTS, {
    variables: {
      claimReferenceNo: claimReferenceNo,
    },
  });
  const role = useRole();
  const { employeeId } = role.data?.me || {};

  const [createClaimMutation] = useMutation(CLAIM.CREATE);
  const [editClaimMutation] = useMutation(CLAIM.EDIT_FULL);
  const [progBar, setProgBar] = useState(0);

  const submitClaim = async () => {
    setProcessing(true);
    const {
      requiredDocuments,
      submittedDocuments,
    } = docsData.getClaimDocuments;
    const {
      claimant,
      claimantContactNo,
      cocNumbers,
      benefits,
      amountSettled,
      relationship,
      payoutBranch,
      payoutReferenceNumber,
      dateOfLoss,
      remarks,
      branchCode,
      dateOfNotification,
    } = newClaimFields;

    const { insuranceCustomerNo } = data
      ? data.getCustomerCocList.customer
      : {};

    const cocNumsOnly = cocNumbers.map((coc) => coc.cocNumber);

    setTimeout(() => {
      setProgBar((prev) => prev + 10);
    }, 500);
    const progBarInterval = setInterval(() => {
      setProgBar((prev) => prev + 20);
    }, 2000);
    try {
      if (existingClaim) {
        const editData = {
          claimsReferenceNo: claimReferenceNo,
          employeeId: employeeId,
          claims: {
            branchCode: '',
            claimsStatus: claimsStatus,
            amountSettled: amountSettled,
            approvedBy: '',
            claimant: claimant,
            claimantRelationship: relationship,
            claimantContactNumber: claimantContactNo,
            payoutBranchCode: payoutBranch,
            payoutReferenceNumber: payoutReferenceNumber,
            dateOfLoss: format(new Date(dateOfLoss), 'LL-dd-yyyy'),
            dateOfNotification: format(
              new Date(dateOfNotification),
              'LL-dd-yyyy'
            ),
            internalClaimsStatus: '',
            isDocumentComplete: documentsComplete(
              requiredDocuments,
              submittedDocuments
            ),
            remarks: remarks,
            sourceOfNotification: 'Direct',
          },
          cocs: cocNumsOnly,
          claimsFromCocs: {
            claimsStatus: claimsStatus,
          },
          claimsFromBenefits: {
            amountSettled: amountSettled,
            benefitCollection: benefits.map((item) => {
              const code = item.benefit.split('/')[0];
              const object = _.omit(item, 'description');
              return {
                ...object,
                benefit: code,
                benefitAmount: Number(item.benefitAmount),
              };
            }),
          },
        };
        console.log(editData);

        const res = await editClaimMutation({
          variables: editData,
        });

        setProgBar(100);
        console.log(res);
        setTimeout(() => {
          const { updateClaimBenefits, updateClaimCocs, updateClaimDetails } =
            res.data || {};
          if (
            res.data &&
            !updateClaimDetails.errors &&
            !updateClaimCocs.errors &&
            !updateClaimBenefits.errors
          ) {
            FlashMessages.success(
              `Claim No. ${updateClaimDetails.data} status is updated.`
            );
            onModalClose();
            claimsRefetch();
          } else {
            FlashMessages.errors('Error with update request');
          }
          clearInterval(progBarInterval);
          setProgBar(0);
        }, 1300);
      } else {
        const newClaimData = {
          claim: {
            approvedBy: '',
            benefitCollection: benefits.map((item) => {
              const code = item.benefit.split('/')[0];
              const object = _.omit(item, 'description');
              return {
                ...object,
                benefit: code,
              };
            }),
            claimant: claimant,
            claimantContactNumber: claimantContactNo,
            claimantRelationship: relationship,
            claimsStatus: 'Reported',
            amountSettled: amountSettled,
            branchCode: branchCode,
            dateOfLoss: format(new Date(dateOfLoss), 'LL-dd-yyyy'),
            dateOfNotification: format(new Date(), 'LL-dd-yyyy'),

            iclickCustomerNo: 'I00000000080testData',
            internalClaimsStatus: 'Not Applicable',
            isDocumentComplete: true,
            payoutBranchCode: payoutBranch,
            payoutReferenceNumber: payoutReferenceNumber,
            sourceOfNotification: 'Direct',
            remarks: remarks,
            insuranceCustomerNo: insuranceCustomerNo,
          },
          cocs: cocNumsOnly,
          employeeId: employeeId,
        };
        const { data } = await createClaimMutation({
          variables: newClaimData,
        });

        const { errors, message, data: newClaimRef } = data.addNewClaim;
        setProgBar(100);
        setTimeout(() => {
          if (!errors) {
            FlashMessages.success(
              `Claim No. ${newClaimRef} is created successfully.`
            );
            onModalClose();
            addClaimRefetch();
          } else {
            FlashMessages.errors(message);
          }
          clearInterval(progBarInterval);
        }, 1300);
        setProgBar(0);
      }
    } catch (err) {
      console.log(err);

      FlashMessages.errors('Error with claim');
      clearInterval(progBarInterval);
      setProgBar(0);
    }
    setTimeout(() => {
      setProcessing(false);
      clearInterval(progBarInterval);
    }, 1000);
  };

  return [submitClaim, progBar];
}

export default useAddClaim;
