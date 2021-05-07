module Queries
  # Queries Users: Return all users
  class ShowAdmin < Queries::BaseQuery
    description 'Find user admin'
    argument :id, String, required: true
    type Types::UserType, null: true

    def resolve(id:)
      check_authentication!
      ::User.find(id)
    end
  end
end
