require 'rails_helper'
module Queries
  module Clib
    RSpec.describe CustomerCocList, type: :request do
      describe '.resolve' do
        let!(:cardo) { create(:user) }

        context 'when all params are completed', :vcr do
          it 'return customer details with 2 cocs' do
            token = login_admin(cardo)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: query('2', '1', 'I00000000131') }
            }
            json = JSON.parse(response.body)
            expect(json['data']['getCustomerCocList']['customer']['insuranceCustomerNo']).to eq 'I00000000131'
            expect(json['data']['getCustomerCocList']['cocs'].count).to eq 2
          end
        end

        def query(limit, page, customer_no)
          <<~GQL
            query {
              getCustomerCocList(
                limit: "#{limit}",
                page: "#{page}",
                customerNo: "#{customer_no}"
                ) {
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
          GQL
        end
      end
    end
  end
end
