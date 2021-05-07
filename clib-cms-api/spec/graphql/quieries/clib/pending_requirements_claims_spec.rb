require 'rails_helper'
module Queries
  module Clib
    RSpec.describe PendingRequirementsClaims, type: :request do
      describe '.resolve' do
        let!(:cardo) { create(:user) }

        context 'when limit is 2 and page is 1', :vcr do
          it 'returns 2 records' do
            token = login_admin(cardo)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: approved_by_insurer_claims('1', '1') }
            }
            json = JSON.parse(response.body)
            expect(json['data']['pendingRequirementsClaims']['totalResult']).to eq '3'
            expect(json['data']['pendingRequirementsClaims']['claims'].count).to eq 1
          end
        end

        def approved_by_insurer_claims(limit, page)
          <<~GQL
            query {
              pendingRequirementsClaims(limit: "#{limit}", page: "#{page}") {
                totalResult
                claims {
                  claimStatus
                  benefit
                  branchCode
                  customerNo
                  claimant
                  claimantRelationship
                  claimantContactNumber
                  claimsReferenceNumber
                  dateFiled
                }
              }
            }
          GQL
        end
      end
    end
  end
end
