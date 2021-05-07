import gql from 'graphql-tag';

const LIST = gql`
  query {
    users {
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

const CURRENT_USER = gql`
  query {
    me {
      id
      email
      username
      fullname
      employeeId
      designation
      sectionUnit
    }
  }
`;

const FIND_USER_WITH_REGION = gql`
  query ShowAdmin($id: String!) {
    showAdmin(id: $id) {
      id
      fullname
      email
      employeeId
      username
      immediateHead
      designation
      sectionUnit
      region {
        name
        areaCode {
          name
        }
      }
    }
  }
`;
const FIND_USER_NO_REGION = gql`
  query ShowAdmin($id: String!) {
    showAdmin(id: $id) {
      id
      fullname
      email
      employeeId
      username
      immediateHead
      designation
      sectionUnit
    }
  }
`;

export default {
  LIST,
  CURRENT_USER,
  FIND_USER_WITH_REGION,
  FIND_USER_NO_REGION,
};
