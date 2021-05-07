module Queries
  # Queries Users: Return specific data for section units
  class SectionUnit < Queries::BaseQuery
    description 'Return specific data for section units'
    argument :id, String, required: true
    type Types::SectionUnitType, null: false

    def resolve(id)
      check_authentication!
      ::SectionUnit.find(id)
    end
  end
end
