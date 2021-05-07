require 'rails_helper'
module Queries
  module Clib
    RSpec.describe Customers, type: :request do
      describe '.resolve' do
        let!(:cardo) { create(:user) }

        context 'when query request is acceptable', :vcr do
          it 'returns 3 records' do
            token = login_admin(cardo)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: query('2', '1', '') }
            }
            json = JSON.parse(response.body)
            expect(json['data']['searchCustomerList'].count).to eq 2
          end
        end

        def query(limit, page, search)
          <<~GQL
            query {
              searchCustomerList(limit: "#{limit}", page: "#{page}", search: "#{search}") {
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
          GQL
        end
      end
    end
  end
end
