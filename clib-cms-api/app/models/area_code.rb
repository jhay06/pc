# AreaCode
# fields
#   name: String
class AreaCode
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  belongs_to :region
  has_many :users
  has_many :branches, dependent: :destroy
end
