module Types
  # User attributes to handle user attributes
  class UserAttributes < Types::BaseInputObject
    description 'Attributes for creating or updating a user'
    argument :username, String, required: true
    argument :employee_id, String, required: true
    argument :fullname, String, required: true
    argument :immediate_head, String, required: true
    argument :section_unit, String, required: true
    argument :email, String, required: true
    argument :designation, String, required: false
  end
end
