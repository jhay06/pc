module Types
  # SectionUnit fields
  class SectionUnitType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :value, String, null: false
    field :designations, [Types::DesignationType], null: false
  end
end
