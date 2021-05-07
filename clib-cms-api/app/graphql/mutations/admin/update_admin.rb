module Mutations
  module Admin
    # UpdateAdmin class to update admin account
    class UpdateAdmin < ::Mutations::BaseMutation
      argument :id, String, required: true
      argument :attributes, Types::UserAttributes, required: true
      argument :region, String, required: false
      argument :area_code, String, required: false

      field :user, Types::UserType, null: true
      field :errors, [String], null: true

      def resolve(id:, attributes:, region:, area_code:)
        check_authentication!
        user = User.find(id)
        region = Region.find_by(name: region)

        if region.present?
          area_code = region.area_codes.where(name: area_code).last
          user.region = region
          user.area_code = area_code
        end

        if user.update(user_params(attributes))
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

      def user_params(attributes)
        {
          username: attributes[:username],
          email: attributes[:email],
          employee_id: attributes[:employee_id],
          fullname: attributes[:fullname],
          immediate_head: attributes[:immediate_head],
          section_unit: attributes[:section_unit],
          designation: attributes[:designation]
        }
      end
    end
  end
end
