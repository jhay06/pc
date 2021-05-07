module Mutations
  module Admin
    # Forget password class
    class ForgetPassword < ::Mutations::BaseMutation
      argument :email, String, required: false

      field :user, Types::UserType, null: true
      field :errors, [String], null: true

      def resolve(email:)
        user = User.find_by(email: email)

        if user.nil?
          {
            user: nil,
            errors: ['Email not found']
          }
        else
          password = SecureRandom.hex(8)
          if user.update(password: password, is_temporary_password: true)
            UserMailer.password_reset(user, password).deliver
            {
              user: user,
              errors: []
            }
          end
        end
      end
    end
  end
end
