import gql from 'graphql-tag';

const LIST = gql`
  query getBranches($limit: String!, $page: String!) {
    getBranches(limit: $limit, page: $page) {
      branchCode
      branchId
      branchName
    }
  }
`;

export default {
  LIST,
};
