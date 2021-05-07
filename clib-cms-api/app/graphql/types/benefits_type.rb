module Types
  # BenefitsType object
  class BenefitsType < Types::BaseObject
    field :code, String, null: false
    field :amount, String, null: false
    field :benefit_type_name, String, null: true

    def code
      object['benefit']
    end

    def amount
      object['benefitAmount']
    end

    def benefit_type_name
      object['benefitType']
    end
  end
end
