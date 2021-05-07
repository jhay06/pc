module Types
  class BaseObject < GraphQL::Schema::Object
    include Benefit
    field_class Types::BaseField
  end
end
