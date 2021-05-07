module Mutations
  module Admin
    # UpdateAdmin class to update admin account
    class DeleteAdmin < ::Mutations::BaseMutation
      argument :id, String, required: true

      field :user, Types::UserType, null: true
      field :errors, [String], null: true

      def resolve(id:)
        check_authentication!
        user = User.find(id)
        return not_allowed_to_delete if user.email == context[:current_user]

        if user.nil? || user.deleted_at
          {
            user: nil,
            errors: ['User not found']
          }
        else
          user.soft_delete
          {
            user: user,
            errors: []
          }
        end
      end

      def not_allowed_to_delete
        {
          user: nil,
          errors: ['Not allowed to do this action']
        }
      end
    end
  end
end
