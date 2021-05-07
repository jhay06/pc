module Mutations
  module Claim
    # Mutations for creating new claims
    class Update < ::Mutations::BaseMutation
      argument :action_done, String, required: true
      argument :claims_reference_no, String, required: true
      argument :cocs, [String], required: true
      argument :submitted_documents, [String], required: true
      argument :claims, GraphQL::Types::JSON, required: true
      argument :employee_id, String, required: true

      field :message, String, null: true
      field :errors, [String], null: true

      def resolve(action_done:, claims_reference_no:, cocs:, submitted_documents:, claims:, employee_id:)
        params = claim_params(action_done, claims_reference_no, cocs, submitted_documents, claims, employee_id)

        data, type = ClibInsurance::ClaimService.update(params)
        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data
      end

      def claim_params(action_done, claims_reference_no, cocs, submitted_documents, claims, employee_id)
        {
          "ActionDone": action_done,
          "ClaimsReferenceNo": claims_reference_no,
          "COCs": cocs,
          "SubmittedDocuments": submitted_documents,
          "Claims": claim_details(claims),
          "EmployeeId": employee_id
        }
      end

      def claim_details(claim)
        {
          # "AmountSettled": claim['amountSettled'],
          "Benefit": extract_benefit(claim['benefit']),
          "Claimant": claim['claimant'],
          "ClaimantContactNo": claim['claimantContactNo'],
          "ClaimStatus": claim['claimStatus']
          # "ApprovedBy": claim['approvedBy'],
          # "DateApproved": claim['dateApproved'],
          # "DateClaimed": claim['dateClaimed']
        }
      end
    end
  end
end
