module Types
  # Customer coc type object from clib api
  class CustomerCocType < Types::BaseObject
    field :customer, Types::CustomerType, null: false
    field :cocs, [Types::CocType], null: false

    def customer
      object['customerDetails']
    end

    def cocs
      object['cOCDetailCollection']
    end
  end
end
