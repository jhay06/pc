require 'rails_helper'
module Queries
  module Clib
    RSpec.describe ApprovedByInsurerClaims, type: :request do
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
            expect(json['data']['approvedByInsurerClaims']['totalResult']).to eq '0'
            expect(json['data']['approvedByInsurerClaims']['claims']).to eq []
          end
        end

        def approved_by_insurer_claims(limit, page)
          <<~GQL
            query {
              approvedByInsurerClaims(limit: "#{limit}", page: "#{page}") {
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
