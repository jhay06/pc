module Queries
  module Clib
    # Return list of all customers
    class Customers < Queries::BaseQuery
      description 'Get all customer via search text'
      argument :limit, String, required: true
      argument :page, String, required: true
      argument :search, String, required: true
      type [Types::CustomerType], null: true

      def resolve(limit:, page:, search:)
        search_params = {
          "Limit": limit.to_i,
          "Page": page.to_i,
          "Search": search
        }

        data, type = ClibInsurance::CustomerService.list(search_params)

        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data['data']
      end
    end
  end
end
