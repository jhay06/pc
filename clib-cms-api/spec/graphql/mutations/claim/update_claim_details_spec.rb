require 'rails_helper'

module Mutations
  module Claim
    RSpec.describe UpdateDetails, type: :request do
      let!(:user) { create(:user) }

      describe '#resolve' do
        context 'valid update coc attributes', :vcr do
          it 'return types success and message' do
            post '/graphql', params: {
              query: update_cocs(
                '202101-00005',
                {},
                '000000'
              )
            }
            json = JSON.parse(response.body)
            expect(json['data']['updateClaimDetails']['message']).to eq 'Claims Details Updated.'
            expect(json['data']['updateClaimDetails']['errors']).to eq nil
            expect(json['data']['updateClaimDetails']['data']).to eq '202101-00005'
          end
        end
      end

      def update_cocs(claims_reference_no, _claims, employee_id)
        <<~GQL
          mutation {
            updateClaimDetails(input: {
              claimsReferenceNo: "#{claims_reference_no}",
              claims: {
                claimStatus: "Pending Requirements",
                amountSettled: "10001.00",
                claimant: "Update Claimant",
                claimantRelationship: "Sister",
                claimantContactNo: "09999999",
                approvedBy: "123456",
                dateApproved: "01-01-2020",
                dateClaimed: "01-01-2020",
                payoutBranch: "61040",
                payoutReferenceNumber: "123123131",
                dateOfLoss: "01-01-2021",
                remarks: "test update"
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
