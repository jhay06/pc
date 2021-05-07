require 'rails_helper'

module Mutations
  module Claim
    RSpec.describe UploadDocument, type: :request do
      let!(:user) { create(:user) }

      describe '#resolve' do
        context 'upload new documents claims', :vcr do
          xit 'return types success and message' do
            post '/graphql', params: {
              query: upload_document(
                '202101-00055',
                '00000',
                []
              )
            }

            json = JSON.parse(response.body)
            expect(json['data']['uploadDocument']['message']).to eq 'Claims Document Uploaded.'
            expect(json['data']['uploadDocument']['errors']).to eq nil
            expect(json['data']['uploadDocument']['data']).to eq '202101-00055'
          end
        end
      end

      def upload_document(claims_reference_no, employee_id, _)
        <<~GQL
          mutation {
            uploadDocument(input: {
              claimsReferenceNo: "#{claims_reference_no}",
              employeeId: "#{employee_id}",
              submittedDocuments: [
                {
                  documentName: "EEBC",
                  fileName: "test.jpg",
                  fileType: ".jpg",
                  fileImageData: "",
                }
              ]
            }) {
              data
              errors
              message
            }
          }
        GQL
      end
    end
  end
end
