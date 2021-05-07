module Types
  # Claim type object from clib api
  class ClaimsCollectionType < Types::BaseObject
    field :total_result, String, null: true
    field :claims, [Types::ClaimDetailsType], null: false

    def total_result
      object['totalResult'].nil? ? claims.count : object['totalResult']
    end

    def claims
      object['claimDetailsCollection']
    end
  end
end
