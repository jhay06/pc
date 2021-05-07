module Types
  # Claim type object from clib api
  class ClaimDetailsType < Types::BaseObject
    field :claim_status, String, null: true
    field :benefit, String, null: true
    field :branch_code, String, null: true
    field :customer_no, String, null: true
    field :claimant, String, null: true
    field :claimant_contact_number, String, null: true
    field :claimant_relationship, String, null: true
    field :claims_reference_number, String, null: true
    field :date_filed, String, null: true

    def claim_status
      object['claimsStatus']
    end

    def benefit
      object['benefit']
    end

    def branch_code
      object['branchCode']
    end

    def customer_no
      object['insuranceCustomerNo']
    end

    def claimant
      object['claimant']
    end

    def claimant_contact_number
      object['claimantContactNumber']
    end

    def claimant_relationship
      object['claimantRelationship']
    end

    def date_filed
      object['dateFiled']
    end

    def claims_reference_number
      object['claimsReferenceNumber']
    end
  end
end
