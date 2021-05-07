module Queries
  # Queries Users: Return all users
  class Me < Queries::BaseQuery
    description 'Current user'
    type Types::UserType, null: false

    def resolve
      check_authentication!
      ::User.find_by(email: context[:current_user])
    end
  end
end
