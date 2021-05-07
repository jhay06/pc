module Queries
  # Queries Users: Return all users
  class Users < Queries::BaseQuery
    description 'Find all users'
    type [Types::UserType], null: false

    def resolve
      check_authentication!
      ::User.all
    end
  end
end
