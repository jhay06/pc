require 'rails_helper'
module Queries
  module Clib
    RSpec.describe ProcessingClaims, type: :request do
      describe '.resolve' do
        let!(:cardo) { create(:user) }

        context 'when limit is 2 and page is 1', :vcr do
          it 'returns 2 records' do
            token = login_admin(cardo)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: processing_claims('2', '1') }
            }
            json = JSON.parse(response.body)
            expect(json['data']['processingClaims'].count).to eq 2
          end
        end

        def processing_claims(limit, page)
          <<~GQL
            query {
              processingClaims(limit: "#{limit}", page: "#{page}") {
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
