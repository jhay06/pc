module Types
  # Coc type object from clib api
  class CocType < Types::BaseObject
    field :coc_number, String, null: true
    field :effective_date, String, null: true
    field :expiry_date, String, null: true
    field :issue_date, String, null: true
    field :reference_number, String, null: true
    field :category_code, String, null: true
    field :product_code, String, null: true
    field :provider_code, String, null: true
    field :partner_code, String, null: true
    field :platform_name, String, null: true
    field :address, String, null: true
    field :city, String, null: true
    field :zip_code, String, null: true
    field :beneficiary_name, String, null: true
    field :beneficiary_relationship, String, null: true
    field :beneficiary_birthday, String, null: true
    field :beneficiary_contact_no, String, null: true
    field :guardian_birthday, String, null: true
    field :paid, String, null: true
    field :active, String, null: true

    def coc_number
      object['cOCNumber']
    end

    # TODO: Readable dateime
    def effective_date
      object['effectiveDate']
    end

    # TODO: Readable dateime
    def expiry_date
      object['terminationDate']
    end

    # TODO: Readable dateime
    def issue_date
      object['issueDate']
    end

    def reference_number
      object['referenceNumber']
    end

    def category_code
      object['categoryCode']
    end

    def product_code
      object['productCode']
    end

    def provider_code
      object['providerCode']
    end

    def partner_code
      object['partnerCode']
    end

    def platform_name
      object['platformName']
    end

    def zip_code
      object['zipCode']
    end

    def beneficiary_name
      object['beneficiaryName']
    end

    def beneficiary_relationship
      object['beneficiaryRelationship']
    end

    # TODO: Readable date
    def beneficiary_birthday
      object['beneficiaryBirthday']
    end

    def beneficiary_contact_no
      object['beneficiaryContactNo']
    end

    def guardian_birthday
      object['guardianBirthday']
    end

    def paid
      object['isPaid']
    end

    def active
      object['isActive']
    end
  end
end
