# SectionUnit
# fields
#   name: String
#   value: String
class SectionUnit
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :value, type: String
  has_many :designations, dependent: :destroy

  set_callback(:create, :before) do |_document|
    self.value = name.split(' ').join('_').downcase.to_sym
  end
end
