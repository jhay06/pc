export const internalStatusMapping = [
  {
    cmsDisplay: 'Reported',
    claimsStatus: 'Reported',
    internalClaimsStatus: 'Not Applicable',
  },
  {
    cmsDisplay: 'Pending Requirements',
    claimsStatus: 'Pending Requirements',
    internalClaimsStatus: 'Not Applicable',
  },
  {
    cmsDisplay: 'Processing',
    claimsStatus: 'Processing',
    internalClaimsStatus: 'Not Applicable',
    next: 'For Approval of Claims Section Head',
  },
  {
    cmsDisplay: 'For Approval of Claims Section Head',
    claimsStatus: 'For Approval of Section Head',
    internalClaimsStatus: 'Not Applicable',
  },
  {
    cmsDisplay: 'For Approval of Claims Department Head',
    claimsStatus: 'For Approval of Claims Department Head',
    internalClaimsStatus: 'Not Applicable',
    next: {
      above60: 'For Approval of Insurer',
      below60: 'For Payment Processing',
    },
  },
  {
    cmsDisplay: 'For Approval of Insurer',
    claimsStatus: 'For Approval of Insurer',
    internalClaimsStatus: 'Not Applicable',
    next: 'For Payment Processing',
  },
  {
    cmsDisplay: 'Approved by Insurer',
    claimsStatus: 'Approved by Insurer',
    internalClaimsStatus: 'Not Applicable',
  },
  {
    cmsDisplay: 'For Payment Processing',
    claimsStatus: 'For Payment Processing',
    internalClaimsStatus: 'Not Applicable',
    next: 'Ready for Release',
  },
  {
    cmsDisplay: 'Ready for Release',
    claimsStatus: 'Ready for Release',
    internalClaimsStatus: 'Not Applicable',
    next: 'Settled',
  },
  {
    cmsDisplay: 'Settled',
    claimsStatus: 'Settled',
    internalClaimsStatus: 'Not Applicable',
  },
  {
    cmsDisplay: 'Denied',
    claimsStatus: 'Denied',
    internalClaimsStatus: 'Not Applicable',
    next: 'For Ex-Gratia Processing',
  },
  {
    cmsDisplay: 'Pending Reimbursement',
    claimsStatus: 'Settled',
    internalClaimsStatus: 'Pending Reimbursement',
  },
  {
    cmsDisplay: 'Reimbursed',
    claimsStatus: 'Settled',
    internalClaimsStatus: 'Reimbursed',
  },
  {
    cmsDisplay: 'For Ex-Gratia Processing',
    claimsStatus: 'Processing',
    internalClaimsStatus: 'Ex-Gratia for Processing',
    next: 'For Approval of Claims Department Head (Ex-Gratia)',
  },
  {
    cmsDisplay: 'For Approval of Claims Department Head (Ex-Gratia)',
    claimsStatus: 'For Approval of Claims Department Head',
    internalClaimsStatus: 'Ex-Gratia for Approval of Claims Department Head',
    next: {
      submit: 'For Approval of Insurer (Ex-Gratia)',
      approve: 'For Approval of Accounting Head (Ex-Gratia)',
    },
  },
  {
    cmsDisplay: 'For Approval of Insurer (Ex-Gratia)',
    claimsStatus: 'For Approval of Insurer',
    internalClaimsStatus: 'Ex-Gratia for Approval of Insurer',
    next: 'Approved by Insurer (Ex-Gratia)',
  },
  {
    cmsDisplay: 'Approved by Insurer (Ex-Gratia)',
    claimsStatus: 'Approved by Insurer',
    internalClaimsStatus: 'Ex-Gratia Approved by Insurer',
    next: 'For Approval of Claims Department Head (Ex-Gratia)',
  },
  {
    cmsDisplay: 'For Approval of Accounting Head (Ex-Gratia)',
    claimsStatus: 'For Payment Processing',
    internalClaimsStatus:
      'Ex-Gratia for Approval of Accounting Department Head',
    next: 'For Ex-Gratia Payment Processing',
  },
  {
    cmsDisplay: 'For Ex-Gratia Payment Processing',
    claimsStatus: 'For Payment Processing',
    internalClaimsStatus: 'Ex-Gratia for Payment Processing',
    next: 'Ready for Release (Ex-Gratia)',
  },
  {
    cmsDisplay: 'Ready for Release (Ex-Gratia)',
    claimsStatus: 'Ready for Release',
    internalClaimsStatus: 'Ex-Gratia Ready for Release',
    next: 'Settled (Ex-Gratia)',
  },
  {
    cmsDisplay: 'Settled (Ex-Gratia)',
    claimsStatus: 'Settled',
    internalClaimsStatus: 'Ex-Gratia Settled',
  },
  {
    cmsDisplay: 'Reactivated for Payout',
    claimsStatus: 'Ready for Release',
    internalClaimsStatus: 'Reactivated for Payout',
    next: 'Ready for Release',
  },
  {
    cmsDisplay: 'Archived',
    claimsStatus: 'Archived',
    internalClaimsStatus: 'Not Applicable',
  },
  {
    cmsDisplay: 'Pending for Release due to Non-Appearance',
    claimsStatus: 'Pending for Release due to Non-Appearance',
    internalClaimsStatus: 'Not Applicable',
  },
];
