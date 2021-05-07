require 'rails_helper'

module Mutations
  module Claim
    RSpec.describe UpdateCoc, type: :request do
      let!(:user) { create(:user) }

      describe '#resolve' do
        context 'valid update coc attributes', :vcr do
          it 'return types success and message' do
            claims = {
              claimStatus: 'Reported'
            }
            cocs = ['000000000141']
            post '/graphql', params: {
              query: update_cocs(
                '202012-00013',
                cocs,
                claims,
                '000000'
              )
            }
            json = JSON.parse(response.body)
            expect(json['data']['updateClaimCocs']['message']).to eq 'COCs with Claims Updated.'
            expect(json['data']['updateClaimCocs']['errors']).to eq nil
            expect(json['data']['updateClaimCocs']['data']).to eq '202012-00013'
          end
        end
      end

      def update_cocs(claims_reference_no, cocs, _claims, employee_id)
        <<~GQL
          mutation {
            updateClaimCocs(input: {
              claimsReferenceNo: "#{claims_reference_no}",
              cocs: #{cocs},
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
