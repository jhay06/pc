module Mutations
  module Admin
    # CreateAdmin class to create admin account
    class CreateAdmin < ::Mutations::BaseMutation
      argument :attributes, Types::UserAttributes, required: true
      argument :region, String, required: false
      argument :area_code, String, required: false

      field :user, Types::UserType, null: true
      field :errors, [String], null: true

      def resolve(attributes:, region:, area_code:)
        check_authentication!
        @password = SecureRandom.hex(5)
        region = Region.find_by(name: region)
        area_code = AreaCode.find_by(name: area_code)

        user = User.new(user_params(@password, attributes, region, area_code))

        if user.save
          UserMailer.new_user(user, @password).deliver
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
      end

      def user_params(password, attributes, region, area_code)
        {
          email: attributes[:email],
          username: attributes[:username],
          password: password,
          password_confirmation: password,
          employee_id: attributes[:employee_id],
          fullname: attributes[:fullname],
          immediate_head: attributes[:immediate_head],
          section_unit: attributes[:section_unit],
          region: region,
          area_code: area_code,
          designation: attributes[:designation]
        }
      end
    end
  end
end
