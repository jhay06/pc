module Mutations
  module Claim
    # Mutations for creating new claims
    class AddNew < ::Mutations::BaseMutation
      argument :claim, GraphQL::Types::JSON, required: true
      argument :cocs, [String], required: true
      argument :employee_id, String, required: true

      field :message, String, null: true
      field :data, String, null: true
      field :errors, [String], null: true

      def resolve(claim:, cocs:, employee_id:)
        params = claim_params(claim, cocs, employee_id)

        data, type = ClibInsurance::ClaimService.add_new(params)
        raise GraphQL::ExecutionError, data['message'] if type != 'Success'

        data
      end

      def claim_params(claim, cocs, employee_id)
        {
          "ClaimDetails": claim_details(claim),
          "COCs": cocs,
          "EmployeeId": employee_id
        }
      end

      def claim_details(claim)
        {
          "AmountSettled": claim['amountSettled'],
          "ApprovedBy": claim['approvedBy'],
          "BenefitCollection": benefit_collection(claim['benefitCollection']),
          "BranchCode": claim['branchCode'],
          "Claimant": claim['claimant'],
          "ClaimantContactNumber": claim['claimantContactNumber'],
          "ClaimantRelationship": claim['claimantRelationship'],
          "ClaimsStatus": claim['claimsStatus'],
          "DateOfLoss": claim['dateOfLoss'],
          "DateOfNotification": claim['dateOfNotification'],
          "IClickCustomerNo": claim['iClickCustomerNo'],
          "InsuranceCustomerNo": claim['insuranceCustomerNo'],
          "InternalClaimsStatus": claim['internalClaimsStatus'],
          "IsDocumentComplete": claim['isDocumentComplete'],
          "PayoutBranchCode": claim['payoutBranchCode'],
          "PayoutReferenceNumber": claim['payoutReferenceNumber'],
          "Remarks": claim['remarks'],
          "SourceOfNotification": claim['sourceOfNotification']
        }
      end
    end
  end
end
