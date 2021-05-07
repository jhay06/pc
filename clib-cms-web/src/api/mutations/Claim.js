import gql from 'graphql-tag';

const CREATE = gql`
  mutation addNewClaim($claim: JSON!, $cocs: [String!]!, $employeeId: String!) {
    addNewClaim(
      input: { claim: $claim, cocs: $cocs, employeeId: $employeeId }
    ) {
      message
      errors
      data
    }
  }
`;

const EDIT = gql`
  mutation updateClaimDetails(
    $claimsReferenceNo: String!
    $employeeId: String!
    $claims: JSON!
  ) {
    updateClaimDetails(
      input: {
        claimsReferenceNo: $claimsReferenceNo
        employeeId: $employeeId
        claims: $claims
      }
    ) {
      message
      errors
      data
    }
  }
`;
const EDIT_FULL = gql`
  mutation updateClaim(
    $claimsReferenceNo: String!
    $employeeId: String!
    $claims: JSON!
    $claimsFromCocs: JSON!
    $cocs: [String!]!
    $claimsFromBenefits: JSON!
  ) {
    updateClaimDetails(
      input: {
        claimsReferenceNo: $claimsReferenceNo
        employeeId: $employeeId
        claims: $claims
      }
    ) {
      message
      errors
      data
    }
    updateClaimCocs(
      input: {
        claimsReferenceNo: $claimsReferenceNo
        cocs: $cocs
        employeeId: $employeeId
        claims: $claimsFromCocs
      }
    ) {
      message
      errors
      data
    }
    updateClaimBenefits(
      input: {
        claimsReferenceNo: $claimsReferenceNo
        claims: $claimsFromBenefits
        employeeId: $employeeId
      }
    ) {
      message
      errors
    }
  }
`;

const UPDATE_COCS = gql`
  mutation updateClaimCocs(
    $claimsReferenceNo: String!
    $cocs: [String!]!
    $employeeId: String!
    $claims: JSON!
  ) {
    updateClaimCocs(
      input: {
        claimsReferenceNo: $claimsReferenceNo
        cocs: $cocs
        employeeId: $employeeId
        claims: $claims
      }
    ) {
      message
      errors
      data
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation updateClaimStatus(
    $claimsReferenceNo: String!
    $claims: JSON!
    $employeeId: String!
  ) {
    updateClaimStatus(
      input: {
        claimsReferenceNo: $claimsReferenceNo
        claims: $claims
        employeeId: $employeeId
      }
    ) {
      message
      errors
      data
    }
  }
`;

const UPDATE_BENEFITS = gql`
  mutation updateClaimBenefits(
    $claimsReferenceNo: String!
    $claims: JSON!
    $employeeId: String!
  ) {
    updateClaimBenefits(
      input: {
        claimsReferenceNo: $claimsReferenceNo
        claims: $claims
        employeeId: $employeeId
      }
    ) {
      message
      errors
    }
  }
`;

const UPLOAD_DOCS = gql`
  mutation uploadDocument(
    $claims: JSON!
    $claimsReferenceNo: String!
    $submittedDocuments: [JSON!]!
    $employeeId: String!
  ) {
    uploadDocument(
      input: {
        claims: $claims
        claimsReferenceNo: $claimsReferenceNo
        submittedDocuments: $submittedDocuments
        employeeId: $employeeId
      }
    ) {
      message
      errors
    }
  }
`;
const EDIT_DOC = gql`
  mutation updateUploadDocument(
    $claims: JSON!
    $claimsReferenceNo: String!
    $submittedDocuments: [JSON!]!
    $employeeId: String!
  ) {
    updateUploadDocument(
      input: {
        claims: $claims
        claimsReferenceNo: $claimsReferenceNo
        submittedDocuments: $submittedDocuments
        employeeId: $employeeId
      }
    ) {
      message
      errors
    }
  }
`;
const DELETE_DOC = gql`
  mutation deleteDocument(
    $claimsReferenceNo: String!
    $submittedDocuments: [JSON!]!
    $employeeId: String!
  ) {
    deleteDocument(
      input: {
        claimsReferenceNo: $claimsReferenceNo
        submittedDocuments: $submittedDocuments
        employeeId: $employeeId
      }
    ) {
      message
      errors
    }
  }
`;

export default {
  CREATE,
  EDIT,
  UPDATE_STATUS,
  UPDATE_COCS,
  UPDATE_BENEFITS,
  UPLOAD_DOCS,
  EDIT_DOC,
  EDIT_FULL,
  DELETE_DOC,
};
