module Types
  # Claim type object from clib api
  class BranchType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :code, String, null: false
    # field :branch_id, String, null: true
    # field :branch_code, String, null: true
    # field :branch_name, String, null: true

    # def branch_id
    #   object['branchId']
    # end

    # def branch_code
    #   object['branchCode']
    # end

    # def branch_name
    #   object['branchName']
    # end
  end
end
