module Queries
  # Queries Users: Return all section units
  class SectionUnits < Queries::BaseQuery
    description 'Return all section units'
    type [Types::SectionUnitType], null: false

    def resolve
      check_authentication!
      ::SectionUnit.all
    end
  end
end
