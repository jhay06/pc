module Queries
  module Clib
    # Return return list of documents for specific claim
    class ClaimDocuments < Queries::BaseQuery
      description 'Get claim documents via claim_references_no'
      argument :claim_reference_no, String, required: true
      type Types::DocumentType, null: false

      def resolve(claim_reference_no:)
        params = {
          "ClaimReferenceNo": claim_reference_no
        }
        data, type = ClibInsurance::ClaimService.documents(params)
        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data['data']
      end
    end
  end
end
