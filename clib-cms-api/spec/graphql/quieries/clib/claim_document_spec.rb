require 'rails_helper'
module Queries
  module Clib
    RSpec.describe ClaimDocuments, type: :request do
      describe '.resolve' do
        let!(:cardo) { create(:user) }

        context 'when all params are completed', :vcr do
          it 'return customer details with 2 cocs' do
            token = login_admin(cardo)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: query('202011-00004') }
            }
            json = JSON.parse(response.body)
            expect(json['data']['getClaimDocuments']['requiredDocuments'].present?).to eq true
            expect(json['data']['getClaimDocuments']['submittedDocuments'].present?).to eq true
          end
        end

        def query(claim_reference_no)
          <<~GQL
            query {
              getClaimDocuments(
                claimReferenceNo: "#{claim_reference_no}"
                ) {
                requiredDocuments
                submittedDocuments {
                  fileName
                  fileType
                  fileImage
                  documentName
                }
              }
            }
          GQL
        end
      end
    end
  end
end
