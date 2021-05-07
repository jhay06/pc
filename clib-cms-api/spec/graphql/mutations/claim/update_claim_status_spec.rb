require 'rails_helper'

module Mutations
  module Claim
    RSpec.describe UpdateStatus, type: :request do
      let!(:user) { create(:user) }

      describe '#resolve' do
        context 'valid update coc attributes', :vcr do
          it 'return types success and message' do
            claims = {
              claimStatus: 'Reported'
            }
            post '/graphql', params: {
              query: update_cocs(
                '202012-00001',
                claims,
                '000000'
              )
            }
            json = JSON.parse(response.body)
            expect(json['data']['updateClaimStatus']['message']).to eq 'Claims Status Updated.'
            expect(json['data']['updateClaimStatus']['errors']).to eq nil
            expect(json['data']['updateClaimStatus']['data']).to eq '202012-00001'
          end
        end
      end

      def update_cocs(claims_reference_no, _claims, employee_id)
        <<~GQL
          mutation {
            updateClaimStatus(input: {
              claimsReferenceNo: "#{claims_reference_no}",
              claims: {
                claimStatus: "Reported"
              },
              employeeId: "#{employee_id}"
          }) {
              message
              errors
              data
            }
          }
        GQL
      end
    end
  end
end
