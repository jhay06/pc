import gql from 'graphql-tag';

const CURRENT_USER_WITH_REGION = gql`
  query {
    me {
      isTemporaryPassword
      email
      employeeId
      fullname
      id
      immediateHead
      region {
        id
        name
        areaCode {
          id
          name
        }
      }
      designation
      sectionUnit
      username
    }
  }
`;
const CURRENT_USER = gql`
  query {
    me {
      isTemporaryPassword
      email
      employeeId
      fullname
      id
      immediateHead
      designation
      sectionUnit
      username
    }
  }
`;

export default {
  CURRENT_USER,
  CURRENT_USER_WITH_REGION,
};
