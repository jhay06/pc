import gql from 'graphql-tag';

const SECTION_UNITS = gql`
  query sectionUnits {
    sectionUnits {
      name
      value
      designations {
        name
        value
        id
      }
    }
  }
`;

export default {
  SECTION_UNITS,
};
