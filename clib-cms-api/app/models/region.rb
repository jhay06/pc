# Region
# fields
#   name: String
class Region
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  has_many :area_codes, dependent: :destroy
  has_many :users
end
