module Mutations
  module Claim
    # add COCs to claims that are already filed
    class UpdateCoc < ::Mutations::BaseMutation
      argument :claims_reference_no, String, required: true
      argument :cocs, [String], required: true
      argument :claims, GraphQL::Types::JSON, required: true
      argument :employee_id, String, required: true

      field :message, String, null: true
      field :data, String, null: true
      field :errors, [String], null: true

      def resolve(claims_reference_no:, cocs:, claims:, employee_id:)
        params = claim_params(claims_reference_no, cocs, claims, employee_id)

        data, type = ClibInsurance::ClaimService.update(params)
        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data
      end

      def claim_params(claims_reference_no, cocs, claims, employee_id)
        {
          "ActionDone": 'Update Claims COCs',
          "ClaimsReferenceNo": claims_reference_no,
          "COCs": cocs,
          "Claims": claim_details(claims),
          "EmployeeId": employee_id
        }
      end

      def claim_details(claim)
        {
          "ClaimsStatus": claim['claimsStatus']
        }
      end
    end
  end
end
