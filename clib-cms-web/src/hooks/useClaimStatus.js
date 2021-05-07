import CLAIM from '../api/mutations/Claim';
import { useMutation } from '@apollo/react-hooks';
import FlashMessages from '../lib/utils/FlashMessages';
import { useRole } from './RoleContext';
import { internalStatusMapping } from '../claimStatusMapping';

const actionsPerStatus = {
  submit: [
    'Ready for Release (Ex-Gratia)',
    'Ready for Release',
    'For Ex-Gratia Payment Processing',
    'Approved by Insurer (Ex-Gratia)',
    'Pending Requirements',
    'Reported',
    'Processing',
    'For Payment Processing',
    'Denied',
    'For Ex-Gratia Processing',
    'Pending for Release due to Non-Appearance',
    'Reactivated for Payout',
    'For Approval of Claims Department Head (Ex-Gratia)',
  ],
  approve: [
    'Ex-Gratia for Approval of Insurer',
    'For Approval of Claims Department Head',
    'For Approval of Claims Section Head',
    'For Approval of Insurer',
    'For Approval of Claims Department Head (Ex-Gratia)',
    'For Approval of Insurer (Ex-Gratia)',
    'For Approval of Accounting Head (Ex-Gratia)',
  ],
  disapprove: ['For Approval of Insurer'],
  deny: ['Processing'],
};

function useClaimStatus(claim, refetchAfterStatusEdit) {
  const { data } = useRole();
  const { employeeId } = data.me;

  const [editClaimMutation, { loading }] = useMutation(CLAIM.UPDATE_STATUS);

  const {
    claimReferenceNo,
    claimsStatus,
    nextClaimStatus,
    amountSettled,
    benefits,
    internalClaimsStatus,
  } = claim || {};

  const handledNullInternal =
    internalClaimsStatus === 'NOT AVAILABLE'
      ? 'Not Applicable'
      : internalClaimsStatus;

  const mappingOfExisting = internalStatusMapping.find(
    (_) =>
      _.claimsStatus === claimsStatus &&
      _.internalClaimsStatus === handledNullInternal
  );

  const updateStatus = async (e) => {
    // setProcessing(true);

    const getStatusObject = (displayName) => {
      return internalStatusMapping.find((_) => _.cmsDisplay === displayName);
    };

    var finalNext;

    if (nextClaimStatus.length === 1) {
      finalNext = getStatusObject(nextClaimStatus[0]);
    } else {
      finalNext = getStatusObject(mappingOfExisting.next);

      if (
        mappingOfExisting.cmsDisplay ===
        'For Approval of Claims Department Head'
      ) {
        if (amountSettled > 60000 || benefits.find((_) => _.code === 'ECA')) {
          finalNext = getStatusObject(mappingOfExisting.next.above60);
        } else if (
          amountSettled < 60000 &&
          !benefits.find((_) => _.code === 'ECA')
        ) {
          finalNext = getStatusObject(mappingOfExisting.next.below60);
        }
      }

      if (
        mappingOfExisting.cmsDisplay ===
        'For Approval of Claims Department Head (Ex-Gratia)'
      ) {
        if (e.target.id === 'submit') {
          finalNext = getStatusObject(mappingOfExisting.next.submit);
        } else if (e.target.id === 'approve') {
          finalNext = getStatusObject(mappingOfExisting.next.approve);
        }
      }
    }

    finalNext = ['deny', 'disapprove'].includes(e.target.id)
      ? getStatusObject('Denied')
      : finalNext;

    const editClaimData = {
      claimsReferenceNo: claimReferenceNo,
      claims: {
        claimsStatus: finalNext?.claimsStatus,
        internalClaimsStatus: finalNext?.internalClaimsStatus,
      },
      employeeId: employeeId,
    };
    console.log(editClaimData);
    try {
      if (editClaimData) {
        const { data } = await editClaimMutation({
          variables: editClaimData,
        });
        const { errors, message, data: refNo } = data.updateClaimStatus;
        console.log(refNo);
        if (!errors) {
          FlashMessages.success(`Claims No. ${refNo} status is updated.`);
          refetchAfterStatusEdit();
        } else {
          FlashMessages.errors(message);
        }
      }
    } catch (err) {
      console.log(err);
      FlashMessages.errors('Unknown error, Please contact ICT Support');
    }
    // setProcessing(false);
  };

  const actionsAvailable = {
    canSubmit: actionsPerStatus.submit.includes(mappingOfExisting.cmsDisplay),
    canDeny:
      actionsPerStatus.deny.includes(mappingOfExisting.cmsDisplay) &&
      amountSettled < 60000 &&
      !benefits.find((_) => _.code === 'ECA'),
    canApprove: actionsPerStatus.approve.includes(mappingOfExisting.cmsDisplay),
    canDisapprove: actionsPerStatus.disapprove.includes(
      mappingOfExisting.cmsDisplay
    ),
  };

  return [updateStatus, actionsAvailable, loading];
}

export default useClaimStatus;
