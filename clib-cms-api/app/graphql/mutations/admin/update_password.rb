module Mutations
  module Admin
    # UpdatePassword admin account
    class UpdatePassword < ::Mutations::BaseMutation
      argument :old_password, String, required: false
      argument :new_password, String, required: false
      argument :password_confirmation, String, required: false

      field :user, Types::UserType, null: true
      field :errors, [String], null: true

      def resolve(old_password:, new_password:, password_confirmation:)
        check_authentication!
        user = User.find_by(email: context[:current_user])

        if user&.authenticate(old_password)
          if user.update(user_params(new_password, password_confirmation))
            {
              user: user,
              errors: []
            }
          else
            {
              user: nil,
              errors: user.errors.full_messages
            }
          end
        else
          {
            user: nil,
            errors: ['Incorrect old password']
          }
        end
      end

      def user_params(new_password, password_confirmation)
        {
          password: new_password,
          password_confirmation: password_confirmation,
          is_temporary_password: false
        }
      end
    end
  end
end
