require 'rails_helper'

module Mutations
  module Claim
    RSpec.describe AddNew, type: :request do
      let!(:user) { create(:user) }

      describe '#resolve' do
        context 'valid add new claim attributes', :vcr do
          xit 'return types success and message' do
            claim = {
              'benefit': 'Natural Death Benefit,Accidental Death Benefit',
              'claimant': 'Jhay',
              'claimantContactNo': '09199717983',
              'claimStatus': 'Reported',
              'amountSettled': '1200',
              'claimantRelationship': 'ClaimantRelationship test',
              'branchCode': '40402',
              'dateOfLoss': '2021-01-01',
              'remarks': 'Remarks testing'
            }
            cocs = %w[000000000141]
            post '/graphql', params: { query: add_new_claim(claim, cocs, 'I00000000080', '000000', '191061') }
            json = JSON.parse(response.body)
            expect(json['data']['addNewClaim']['message']).to eq 'Added claims'
            expect(json['data']['addNewClaim']['errors']).to eq nil
          end
        end

        context 'valid add new claim attribute', :vcr do
          xit 'return types and error message' do
            claim = {
              'benefit': '',
              'claimant': 'Jhay',
              'claimantContactNo': '09199717983',
              'claimStatus': 'Reported'
            }
            cocs = %w[000000000141]
            post '/graphql', params: { query: add_new_claim(claim, cocs, 'I00000000080', '000000', '191061') }
            json = JSON.parse(response.body)

            expect(json['data']['addNewClaim']).to eq nil
            expect(json['errors'].present?).to eq true
          end
        end
      end

      def add_new_claim(claim, cocs, insurance_customer_no, iclick_customer_no, employee_id)
        <<~GQL
          mutation {
            addNewClaim(input: {
              claim: {
                benefit: "#{claim['benefit']}",
                claimant: "#{claim['claimant']}",
                claimantContactNo: "#{claim['claimantContactNo']}",
                claimStatus: "#{claim['claimStatus']}",
                amountSettled: "#{claim['amountSettled']}",
                claimantRelationship: "#{claim['claimantRelationship']}",
                branchCode: "#{claim['branchCode']}",
                dateOfLoss: "#{claim['dateOfLoss']}",
                remarks: "#{claim['remarks']}"
              }
              cocs: #{cocs}
              insuranceCustomerNo: "#{insurance_customer_no}"
              iclickCustomerNo: "#{iclick_customer_no}"
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
