module Queries
  module Clib
    # Return list of all branches
    class Branches < Queries::BaseQuery
      description 'Get all branches'
      argument :limit, String, required: true
      argument :page, String, required: true
      type [Types::BranchType], null: true

      def resolve(limit:, page:)
        params = {
          "Limit": limit.to_i,
          "Page": page.to_i
        }

        data, type = ClibInsurance::BranchService.list(params)

        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data['data']
      end
    end
  end
end
