module Mutations
  module Auth
    class Login < ::Mutations::BaseMutation
      argument :username, String, required: true
      argument :password, String, required: true

      field :token, String, null: true
      field :exp, String, null: true
      field :user, Types::UserType, null: true
      field :errors, [String], null: true

      def resolve(username:, password:)
        user = User.find_by(username: username) || User.find_by(email: username)

        if user && user.authenticate(password)
          getToken = JsonWebToken.encode(id: user.email)
          {
            token: getToken,
            exp: JsonWebToken.decode(getToken).first["exp"],
            user: user,
            errors: []
          }
        else
          {
            token: nil,
            exp: nil,
            user: nil,
            errors: ["Invalid email or password"]
          }
        end
      end
    end
  end
end
