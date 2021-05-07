module Queries
  # Queries Users: Return all Branches
  class Branches < Queries::BaseQuery
    description 'Return all branches'
    type [Types::BranchType], null: false

    def resolve
      check_authentication!
      ::Branch.all
    end
  end
end
