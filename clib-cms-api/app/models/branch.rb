# Branch
# fields
#   name: String
class Branch
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :code, type: String
  belongs_to :area_code
end
