import gql from 'graphql-tag';

const DOCUMENTS = gql`
  query GetClaimDocuments($claimReferenceNo: String!) {
    getClaimDocuments(claimReferenceNo: $claimReferenceNo) {
      requiredDocuments
      submittedDocuments {
        fileName
        fileType
        fileImage
        documentName
      }
    }
  }
`;

export default {
  DOCUMENTS,
};
