require 'rails_helper'
module Queries
  module Clib
    RSpec.describe CustomerClaims, type: :request do
      describe '.resolve' do
        let!(:cardo) { create(:user) }

        context 'when all params are completed', :vcr do
          xit 'return customer details with 2 cocs' do
            token = login_admin(cardo)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: query('1', '1', 'I00000000080') }
            }
            json = JSON.parse(response.body)
            expect(json['data']['getCustomerClaims'].count).to eq 1
          end
        end

        def query(limit, page, customer_no)
          <<~GQL
            query {
              getCustomerClaims(
                limit: "#{limit}",
                page: "#{page}",
                customerNo: "#{customer_no}"
                ) {
                claimReferenceNo
                claimsStatus
                internalClaimsStatus
                benefits {
                  code
                  amount
                  benefitType
                }
                amountSettled
                dateFiled
                branchCode
                claimant
                claimantContactNo
                cocs
                payoutReferenceNumber
                payoutBranch
                remarks
                dateOfLoss
                dateOfNotification
                nextClaimStatus

              }
            }
          GQL
        end
      end
    end
  end
end
