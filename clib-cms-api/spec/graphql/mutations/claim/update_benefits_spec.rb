require 'rails_helper'

module Mutations
  module Claim
    RSpec.describe UpdateBenefits, type: :request do
      let!(:user) { create(:user) }

      describe '#resolve' do
        context 'single benefits', :vcr do
          xit 'return types success and message' do
            claims = {
              'benefit': 'Natural Death Benefit'
            }
            post '/graphql', params: {
              query: update_cocs(
                '202012-00013',
                claims,
                '000000'
              )
            }
            json = JSON.parse(response.body)
            expect(json['data']['updateClaimBenefits']['message']).to eq 'Claims Benefits Updated.'
            expect(json['data']['updateClaimBenefits']['errors']).to eq nil
            expect(json['data']['updateClaimBenefits']['data']).to eq '202012-00013'
          end
        end

        context 'multiple benefits', :vcr do
          xit 'return types success and message' do
            claim = {
              'benefit': 'Natural Death Benefit,Accidental Death Benefit'
            }
            post '/graphql', params: {
              query: update_cocs(
                '202012-00013',
                claim,
                '000000'
              )
            }
            json = JSON.parse(response.body)
            expect(json['data']['updateClaimBenefits']['message']).to eq 'Claims Benefits Updated.'
            expect(json['data']['updateClaimBenefits']['errors']).to eq nil
            expect(json['data']['updateClaimBenefits']['data']).to eq '202012-00013'
          end
        end
      end

      def update_cocs(claims_reference_no, claims, employee_id)
        <<~GQL
          mutation {
            updateClaimBenefits(input: {
              claimsReferenceNo: "#{claims_reference_no}",
              employeeId: "#{employee_id}",
              claims: {
                benefit: "#{claims[:benefit]}"
              }
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
