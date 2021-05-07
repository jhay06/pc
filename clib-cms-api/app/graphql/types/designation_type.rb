module Types
  # DesignationType fields
  class DesignationType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :value, String, null: false
  end
end
