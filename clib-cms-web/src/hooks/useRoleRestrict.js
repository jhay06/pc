import _ from 'lodash';
import { useRole } from './RoleContext';

const useRoleRestrict = (feature) => {
  const role = useRole();
  const { designation } = role.data?.me || {};

  const restrictions = [
    {
      feature: 'overview',
      restrictedRoles: [
        'pioneer_claims',
        'disbursement_staff',
        'accounting_head',
      ],
    },
    {
      feature: 'claimDocuments',
      restrictedRoles: [
        'division_manager',
        'group_head',
        'operations_manager',
        'insurance_officer',
        'insurance_specialist',
      ],
    },
    {
      feature: 'addClaim',
      restrictedRoles: [
        'insurance_specialist',
        'insurance_officer',
        'operations_manager',
        'division_manager',
        'disbursement_staff',
        'accounting_head',
        'group_head',
        'pioneer_claims',
      ],
    },
    {
      feature: 'editClaim',
      restrictedRoles: [
        'insurance_specialist',
        'insurance_officer',
        'operations_manager',
        'division_manager',
      ],
    },
    {
      feature: 'updateStatus',
      restrictedRoles: [
        'insurance_specialist',
        'insurance_officer',
        'operations_manager',
        'division_manager',
      ],
    },
  ];

  const restrictClaimEditDocsCRUD = (status) => {
    const restrictions = [
      {
        role: 'claims_lead',
        claimsStatus: [
          'Reactivated for Payout',
          'For Payment Processing',
          'For Ex-Gratia Processing',
          'For Ex-Gratia Payment Processing',
          'For Approval of Insurer (Ex-Gratia)',
          'For Approval of Insurer',
          'For Approval of Claims Section Head',
          'For Approval of Claims Department Head',
          'For Approval of Claims Department Head (Ex-Gratia)',
          'For Approval of Accounting Head (Ex-Gratia)',
          'Approved by Insurer (Ex-Gratia)',
        ],
      },
      {
        role: 'claims_section_head',
        claimsStatus: [
          'For Approval of Insurer (Ex-Gratia)',
          'For Approval of Insurer',
          'For Approval of Claims Department Head (Ex-Gratia)',
          'For Approval of Claims Department Head',
          'For Approval of Accounting Head (Ex-Gratia)',
        ],
      },
      {
        role: 'claims_department_head',
        claimsStatus: [
          'For Approval of Insurer (Ex-Gratia)',
          'For Approval of Insurer',
          'For Approval of Accounting Head (Ex-Gratia)',
        ],
      },
      {
        role: 'disbursement_staff',
        claimsStatus: [status],
      },
      {
        role: 'pioneer_claims',
        claimsStatus: [
          'Reported',
          'Ready for Release (Ex-Gratia)',
          'Ready for Release',
          'Reactivated for Payout',
          'Processing',
          'Pending Requirements',
          'Pending for Release due to Non-Appearance',
          'For Payment Processing',
          'For Ex-Gratia Processing',
          'For Ex-Gratia Payment Processing',
          'For Approval of Accounting Head (Ex-Gratia)',
          'For Approval of Claims Section Head',
          'For Approval of Claims Department Head',
          'For Approval of Claims Department Head (Ex-Gratia)',
          'Denied',
          'Approved by Insurer (Ex-Gratia)',
        ],
      },
      {
        role: 'accounting_head',
        claimsStatus: [
          'Reported',
          'Ready for Release (Ex-Gratia)',
          'Ready for Release',
          'Reactivated for Payout',
          'Processing',
          'Pending Requirements',
          'Pending for Release due to Non-Appearance',
          'For Payment Processing',
          'For Ex-Gratia Processing',
          'For Ex-Gratia Payment Processing',
          'For Approval of Insurer (Ex-Gratia)',
          'For Approval of Insurer',
          'For Approval of Claims Section Head',
          'For Approval of Claims Department Head (Ex-Gratia)',
          'For Approval of Claims Department Head',
          'Approved by Insurer (Ex-Gratia)',
          'Denied',
        ],
      },
    ];

    const found = restrictions.find(
      (item) =>
        item.claimsStatus.includes(status) &&
        _.snakeCase(designation) === item.role
    );

    return found ? true : false;
  };

  const isOverviewRestricted = restrictions
    .find((item) => item.feature === feature)
    ?.restrictedRoles?.includes(_.snakeCase(designation));

  const hasAccess = !isOverviewRestricted;

  return { hasAccess, restrictClaimEditDocsCRUD };
};

export default useRoleRestrict;
