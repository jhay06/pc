require 'rails_helper'
module Queries
  module Clib
    RSpec.describe ReportedClaims, type: :request do
      describe '.resolve' do
        let!(:cardo) { create(:user) }

        context 'when limit is 2 and page is 1', :vcr do
          it 'returns 2 records' do
            token = login_admin(cardo)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: reported_claims('2', '1') }
            }
            json = JSON.parse(response.body)
            expect(json['data']['reportedClaims'].count).to eq 2
          end
        end

        def reported_claims(limit, page)
          <<~GQL
            query {
              reportedClaims(limit: "#{limit}", page: "#{page}") {
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
