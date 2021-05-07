import gql from 'graphql-tag';

const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $oldPassword: String!
    $newPassword: String!
    $passwordConfirmation: String!
  ) {
    updatePassword(
      input: {
        oldPassword: $oldPassword
        newPassword: $newPassword
        passwordConfirmation: $passwordConfirmation
      }
    ) {
      user {
        id
        email
      }
      errors
    }
  }
`;

export default {
  UPDATE_PASSWORD,
};
