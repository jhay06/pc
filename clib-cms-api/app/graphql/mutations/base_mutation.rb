module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    include Benefit
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    private

    def check_authentication!
      return if context[:current_user]

      raise GraphQL::ExecutionError, 'You need to authenticate to perform this action'
    end
  end
end
