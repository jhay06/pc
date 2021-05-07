module Queries
  module Clib
    # Return list of all claims with PendingRequirements status
    class PendingRequirementsClaims < Queries::BaseQuery
      description 'PendingRequirements'
      argument :limit, String, required: true
      argument :page, String, required: true
      type Types::ClaimsCollectionType, null: true

      def resolve(page:, limit:)
        params = {
          "ClaimStatus": 'Pending Requirements',
          "Page": page.to_i,
          "Limit": limit.to_i
        }
        data, type = ClibInsurance::ClaimService.status(params)
        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data['data']
      end
    end
  end
end
