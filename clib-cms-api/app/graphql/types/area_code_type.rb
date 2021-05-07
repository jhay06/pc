module Types
  # AreaCode fields
  class AreaCodeType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :branches, [Types::BranchType], null: false
  end
end
