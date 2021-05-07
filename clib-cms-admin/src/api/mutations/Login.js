import gql from 'graphql-tag';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
      exp
      errors
      user {
        designation
      }
    }
  }
`;

export default {
  LOGIN,
};
