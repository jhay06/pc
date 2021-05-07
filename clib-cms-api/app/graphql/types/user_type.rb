module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String, null: false
    field :username, String, null: false
    field :employee_id, String, null: false
    field :fullname, String, null: false
    field :immediate_head, String, null: false
    field :section_unit, String, null: false
    field :designation, String, null: false
    field :region, Types::RegionType, null: false
    field :is_temporary_password, Boolean, null: false
  end
end
