module Queries
  module Clib
    # Return list of coc for specific customer
    class CustomerCocList < Queries::BaseQuery
      description 'Get customer coc list via customer_no'
      argument :limit, String, required: true
      argument :page, String, required: true
      argument :customer_no, String, required: true
      type Types::CustomerCocType, null: false

      def resolve(limit:, page:, customer_no:)
        params = {
          "Limit": limit.to_i,
          "Page": page.to_i,
          "CustomerNo": customer_no
        }

        data, type = ClibInsurance::CustomerService.cocs(params)
        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data['data']
      end
    end
  end
end
