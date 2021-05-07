module Queries
  module Clib
    # Return customer information
    class CustomerInfo < Queries::BaseQuery
      description 'Get customer info via firstname middlename lastname and dob'
      argument :first_name, String, required: true
      argument :middle_name, String, required: true
      argument :last_name, String, required: true
      argument :date_of_birth, String, required: true
      type Types::CustomerType, null: false

      def resolve(first_name:, middle_name:, last_name:, date_of_birth:)
        params = {
          "FirstName": first_name,
          "MiddleName": middle_name,
          "LastName": last_name,
          "DateOfBirth": date_of_birth
        }
        data, type = ClibInsurance::CustomerService.info(params)
        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data['data']
      end
    end
  end
end
