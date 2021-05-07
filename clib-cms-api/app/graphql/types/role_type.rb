module Types
  # RoleType object
  class RoleType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
  end
end
