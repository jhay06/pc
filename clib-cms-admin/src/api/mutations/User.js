import gql from 'graphql-tag';

const CREATE = gql`
  mutation CreateAdmin(
    $attributes: UserAttributes!
    $region: String!
    $areaCode: String!
  ) {
    createAdmin(
      input: { attributes: $attributes, region: $region, areaCode: $areaCode }
    ) {
      user {
        id
        username
        email
        employeeId
        fullname
      }
      errors
    }
  }
`;

const DELETE = gql`
  mutation DeleteAdmin($id: String!) {
    deleteAdmin(input: { id: $id }) {
      user {
        id
        username
        email
        employeeId
        fullname
      }
      errors
    }
  }
`;

const UPDATE = gql`
  mutation UpdateAdmin(
    $id: String!
    $attributes: UserAttributes!
    $region: String!
    $areaCode: String!
  ) {
    updateAdmin(
      input: {
        id: $id
        attributes: $attributes
        region: $region
        areaCode: $areaCode
      }
    ) {
      user {
        id
        username
        email
        fullname
        employeeId
        designation
        region {
          name
          areaCode {
            name
          }
        }
      }
      errors
    }
  }
`;

export default {
  CREATE,
  DELETE,
  UPDATE,
};
