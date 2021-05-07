module Queries
  # Queries Users: Return all section units
  class Regions < Queries::BaseQuery
    description 'Return all regions area_codes and branches'
    type [Types::RegionType], null: false

    def resolve
      check_authentication!
      ::Region.all
    end
  end
end
