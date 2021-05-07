module Types
  # Claim type object from clib api
  class ClaimType < Types::BaseObject
    field :claim_reference_no, String, null: true
    field :claims_status, String, null: true
    field :internal_claims_status, String, null: true
    field :benefits, [Types::BenefitsType], null: true
    field :amount_settled, String, null: true
    field :date_filed, String, null: true
    field :branch_code, String, null: true
    field :claimant, String, null: true
    field :claimant_contact_no, String, null: true
    field :cocs, [String], null: true
    field :payout_reference_number, String, null: true
    field :payout_branch, String, null: true
    field :remarks, String, null: true
    field :date_of_loss, String, null: true
    field :date_of_notification, String, null: true
    field :claimant_relationship, String, null: true
    field :display_status, String, null: true
    field :previous_status, [String], null: true
    field :next_status, [String], null: true
    field :processing_restrictions, [GraphQL::Types::JSON], null: true

    def display_status
      ClaimsMap.display_status(claims_status, internal_claims_status)
    end

    def next_status
      ClaimsMap.next_status(claims_status, internal_claims_status)
    end

    def previous_status
      ClaimsMap.previous_status(claims_status, internal_claims_status)
    end

    def processing_restrictions
      ClaimsMap.processing_restrictions(claims_status, internal_claims_status)
    end

    def claimant_relationship
      object['claimantRelationship']
    end

    def date_of_notification
      object['dateOfNotification']
    end

    def date_of_loss
      object['dateOfLoss']
    end

    def remarks
      object['remarks']
    end

    def payout_branch
      object['payoutBranch']
    end

    def payout_reference_number
      object['payoutReferenceNumber']
    end

    def claim_reference_no
      object['claimReferenceNo']
    end

    def claims_status
      object['claimStatus']
    end

    def amount_settled
      object['amountSettled']
    end

    # TODO: readable datetime
    def date_filed
      object['dateFiled']
    end

    def branch_code
      object['branchCode']
    end

    def claimant
      object['claimant']
    end

    def claimant_contact_no
      object['claimantContactNo']
    end

    def benefits
      object['benefitCollection']
    end

    def internal_claims_status
      object['internalClaimsStatus'].present? ? object['internalClaimsStatus'] : 'Not Applicable'
    end

    def cocs
      object['cOCs']
    end
  end
end
