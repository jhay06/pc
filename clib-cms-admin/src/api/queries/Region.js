import gql from 'graphql-tag';

const REGIONS = gql`
  query regions {
    regions {
      id
      name
      areaCodes {
        name
        id
      }
    }
  }
`;

export default {
  REGIONS,
};
