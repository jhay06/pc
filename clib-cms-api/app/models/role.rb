# Role model
# fields
#   name: String
class Role
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  belongs_to :user
end
