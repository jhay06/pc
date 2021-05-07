module Mutations
  module Claim
    # Mutations for deleting new documents
    class DeleteDocument < ::Mutations::BaseMutation
      argument :claims_reference_no, String, required: true
      argument :employee_id, String, required: true
      argument :submitted_documents, [GraphQL::Types::JSON], required: true

      field :message, String, null: true
      field :data, String, null: true
      field :errors, [String], null: true

      def resolve(submitted_documents:, claims_reference_no:, employee_id:)
        params = document_params(submitted_documents, claims_reference_no, employee_id)

        data, type = ClibInsurance::ClaimService.update(params)
        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data
      end

      def document_params(submitted_documents, claims_reference_no, employee_id)
        {
          'ActionDone': 'Delete Submitted Claims Requirement',
          'Claims': {},
          'SubmittedDocuments': submitted_document_params(submitted_documents),
          'ClaimsReferenceNo': claims_reference_no.to_s,
          'EmployeeId': employee_id.to_s
        }
      end

      def submitted_document_params(params)
        params.map do |item|
          {
            'DocumentName': item['documentName'],
            'FileName': item['fileName']
          }
        end
      end
    end
  end
end
