import gql from 'graphql-tag';

const TOTALS = gql`
  query totalCountClaims($limit: String!, $page: String!) {
    reportedClaims(limit: $limit, page: $page) {
      totalResult
    }
    pendingRequirementsClaims(limit: $limit, page: $page) {
      totalResult
    }
    processingClaims(limit: $limit, page: $page) {
      totalResult
    }
    insurerApprovalClaims(limit: $limit, page: $page) {
      totalResult
    }
    approvedByInsurerClaims(limit: $limit, page: $page) {
      totalResult
    }
    readyForReleaseClaims(limit: $limit, page: $page) {
      totalResult
    }
  }
`;

const REPORTED = gql`
  query reportedClaims($limit: String!, $page: String!) {
    reportedClaims(limit: $limit, page: $page) {
      totalResult
      claims {
        claimStatus
        benefit
        branchCode
        customerNo
        claimant
        claimantRelationship
        claimantContactNumber
        claimsReferenceNumber
        dateFiled
      }
    }
  }
`;

const PENDING_REQ = gql`
  query pendingRequirementsClaims($limit: String!, $page: String!) {
    pendingRequirementsClaims(limit: $limit, page: $page) {
      totalResult
      claims {
        claimStatus
        benefit
        branchCode
        customerNo
        claimant
        claimantRelationship
        claimantContactNumber
        claimsReferenceNumber
        dateFiled
      }
    }
  }
`;
const PROCESSING = gql`
  query processingClaims($limit: String!, $page: String!) {
    processingClaims(limit: $limit, page: $page) {
      totalResult
      claims {
        claimStatus
        benefit
        branchCode
        customerNo
        claimant
        claimantRelationship
        claimantContactNumber
        claimsReferenceNumber
        dateFiled
      }
    }
  }
`;
const INSURER_APPROVAL = gql`
  query insurerApprovalClaims($limit: String!, $page: String!) {
    insurerApprovalClaims(limit: $limit, page: $page) {
      totalResult
      claims {
        claimStatus
        benefit
        branchCode
        customerNo
        claimant
        claimantRelationship
        claimantContactNumber
        claimsReferenceNumber
        dateFiled
      }
    }
  }
`;
const INSURER_APPROVED = gql`
  query approvedByInsurerClaims($limit: String!, $page: String!) {
    approvedByInsurerClaims(limit: $limit, page: $page) {
      totalResult
      claims {
        claimStatus
        benefit
        branchCode
        customerNo
        claimant
        claimantRelationship
        claimantContactNumber
        claimsReferenceNumber
        dateFiled
      }
    }
  }
`;
const READY_RELEASE = gql`
  query readyForReleaseClaims($limit: String!, $page: String!) {
    readyForReleaseClaims(limit: $limit, page: $page) {
      totalResult
      claims {
        claimStatus
        benefit
        branchCode
        customerNo
        claimant
        claimantRelationship
        claimantContactNumber
        claimsReferenceNumber
        dateFiled
      }
    }
  }
`;

export default {
  TOTALS,
  REPORTED,
  PENDING_REQ,
  PROCESSING,
  INSURER_APPROVAL,
  INSURER_APPROVED,
  READY_RELEASE,
};
