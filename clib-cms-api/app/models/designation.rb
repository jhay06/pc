# Designation
# fields
#   name: String
class Designation
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :value, type: String
  belongs_to :section_unit

  set_callback(:create, :before) do |_document|
    self.value = name.split(' ').join('_').downcase.to_sym
  end
end
