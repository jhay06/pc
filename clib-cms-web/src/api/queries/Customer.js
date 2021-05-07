import gql from 'graphql-tag';

const SEARCH_LIST = gql`
  query SearchCustomerList($limit: String!, $page: String!, $search: String!) {
    searchCustomerList(limit: $limit, page: $page, search: $search) {
      insuranceCustomerNo
      fullname
      firstName
      lastName
      insuranceCustomerNo
      middleName
      dateOfBirth
      placeOfBirth
      gender
      validIdNumber
      validIdPresented
      mobileNumber
      landline
      nationality
      civilStatus
      sourceOfFunds
      natureOfWork
      emailAddress
      address
      city
      zipCode
    }
  }
`;

const CLAIMS = gql`
  query GetCustomerClaims(
    $limit: String!
    $page: String!
    $customerNo: String!
  ) {
    getCustomerClaims(limit: $limit, page: $page, customerNo: $customerNo) {
      claimReferenceNo
      claimsStatus
      internalClaimsStatus
      amountSettled
      dateFiled
      branchCode
      claimant
      claimantContactNo
      claimantRelationship
      cocs
      payoutReferenceNumber
      payoutBranch
      remarks
      dateOfLoss
      dateOfNotification
      nextClaimStatus
      benefits {
        code
        amount
        benefitTypeName
      }
    }
  }
`;

const COC_LIST = gql`
  query GetCustomerCocList(
    $limit: String!
    $page: String!
    $customerNo: String!
  ) {
    getCustomerCocList(limit: $limit, page: $page, customerNo: $customerNo) {
      customer {
        insuranceCustomerNo
        fullname
        firstName
        lastName
        insuranceCustomerNo
        middleName
        dateOfBirth
        placeOfBirth
        gender
        validIdNumber
        validIdPresented
        mobileNumber
        landline
        emailAddress
        nationality
        civilStatus
        sourceOfFunds
        natureOfWork
        address
        city
        zipCode
      }
      cocs {
        cocNumber
        effectiveDate
        expiryDate
        issueDate
        referenceNumber
        categoryCode
        productCode
        partnerCode
        platformName
        address
        city
        zipCode
        beneficiaryName
        beneficiaryRelationship
        beneficiaryBirthday
        beneficiaryContactNo
        guardianBirthday
        paid
        active
      }
    }
  }
`;

const INFO = gql`
  query GetCustomerInfo(
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $dataOfBirth: String!
  ) {
    getCustomerInfo(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      dataOfBirth: $dataOfBirth
    ) {
      insuranceCustomerNo
      fullname
      firstName
      lastName
      insuranceCustomerNo
      middleName
      dateOfBirth
      placeOfBirth
      gender
      validIdNumber
      validIdPresented
      mobileNumber
      landline
      emailAddress
      nationality
      civilStatus
      sourceOfFunds
      natureOfWork
    }
  }
`;

export default {
  SEARCH_LIST,
  CLAIMS,
  COC_LIST,
  INFO,
};
