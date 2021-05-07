import gql from 'graphql-tag';

const LIST = gql`
  query getBranches {
    branches {
      code
      id
      name
    }
  }
`;

export default {
  LIST,
};
