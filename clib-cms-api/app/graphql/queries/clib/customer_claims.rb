module Queries
  module Clib
    # Return list of claims for specific customer
    class CustomerClaims < Queries::BaseQuery
      description 'Get customer claims via customer_no'
      argument :limit, String, required: true
      argument :page, String, required: true
      argument :customer_no, String, required: true
      type [Types::ClaimType], null: false

      def resolve(limit:, page:, customer_no:)
        params = {
          "Limit": limit.to_i,
          "Page": page.to_i,
          "CustomerNo": customer_no
        }
        data, type = ClibInsurance::CustomerService.claims(params)
        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data['data']
      end
    end
  end
end
