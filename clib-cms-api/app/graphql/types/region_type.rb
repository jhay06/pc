module Types
  # RegionType fields
  class RegionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :area_codes, [Types::AreaCodeType], null: false
    field :area_code, Types::AreaCodeType, null: false

    def area_code
      user = User.find_by(region: object)
      AreaCode.find(user.area_code_id)
    end
  end
end
