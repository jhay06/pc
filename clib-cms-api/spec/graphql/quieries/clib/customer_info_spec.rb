require 'rails_helper'
module Queries
  module Clib
    RSpec.describe CustomerInfo, type: :request do
      describe '.resolve' do
        let!(:cardo) { create(:user) }

        context 'when all params are completed', :vcr do
          it 'return customer info' do
            token = login_admin(cardo)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: query('Jhay', 'Tolentino', 'Mendoza', '10-10-2000') }
            }
            json = JSON.parse(response.body)
            expect(json['data']['getCustomerInfo']['firstName']).to eq 'Jhay'
            expect(json['data']['getCustomerInfo']['middleName']).to eq 'Tolentino'
            expect(json['data']['getCustomerInfo']['lastName']).to eq 'Mendoza'
            expect(json['data']['getCustomerInfo']['dateOfBirth']).to eq '2000-10-10T00:00:00'
          end
        end

        def query(first_name, middle_name, last_name, date_of_birth)
          <<~GQL
            query {
              getCustomerInfo(
                firstName: "#{first_name}",
                middleName: "#{middle_name}",
                lastName: "#{last_name}"
                dateOfBirth: "#{date_of_birth}",
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
          GQL
        end
      end
    end
  end
end
