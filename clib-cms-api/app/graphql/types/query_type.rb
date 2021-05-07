module Types
  class QueryType < Types::BaseObject
    field :users, resolver: Queries::Users
    field :me, resolver: Queries::Me
    field :show_admin, resolver: Queries::ShowAdmin
    field :get_branches, resolver: Queries::Clib::Branches
    field :search_customer_list, resolver: Queries::Clib::Customers
    field :get_customer_info, resolver: Queries::Clib::CustomerInfo
    field :get_customer_coc_list, resolver: Queries::Clib::CustomerCocList
    field :get_customer_claims, resolver: Queries::Clib::CustomerClaims
    field :get_claim_documents, resolver: Queries::Clib::ClaimDocuments

    # Claims References
    field :reported_claims, resolver: Queries::Clib::ReportedClaims
    field :processing_claims, resolver: Queries::Clib::ProcessingClaims
    field :ready_for_release_claims, resolver: Queries::Clib::ReadyForReleaseClaims
    field :approved_by_insurer_claims, resolver: Queries::Clib::ApprovedByInsurerClaims
    field :pending_requirements_claims, resolver: Queries::Clib::PendingRequirementsClaims
    field :insurer_approval_claims, resolver: Queries::Clib::InsurerApprovalClaims

    # Section Units
    field :section_units, resolver: Queries::SectionUnits
    field :section_unit, resolver: Queries::SectionUnit

    # Regions
    field :regions, resolver: Queries::Regions

    # Branches
    field :branches, resolver: Queries::Branches
  end
end
