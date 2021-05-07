module Types
  class MutationType < Types::BaseObject
    # User login
    field :login, mutation: Mutations::Auth::Login
    # Create Admin
    field :create_admin, mutation: Mutations::Admin::CreateAdmin
    # Forget password
    field :forget_password, mutation: Mutations::Admin::ForgetPassword
    # Update Admin
    field :update_admin, mutation: Mutations::Admin::UpdateAdmin
    # Delete Admin
    field :delete_admin, mutation: Mutations::Admin::DeleteAdmin
    # Delete Admin
    field :update_password, mutation: Mutations::Admin::UpdatePassword

    # AddNewClaim
    field :add_new_claim, mutation: Mutations::Claim::AddNew
    # Update Claims Cocs
    field :update_claim_cocs, mutation: Mutations::Claim::UpdateCoc
    # Update Claims Status
    field :update_claim_status, mutation: Mutations::Claim::UpdateStatus
    # Update Claims Benefits
    field :update_claim_benefits, mutation: Mutations::Claim::UpdateBenefits
    # Update Claims Details
    field :update_claim_details, mutation: Mutations::Claim::UpdateDetails
    # Upload New Documents
    field :upload_document, mutation: Mutations::Claim::UploadDocument
    # Update Upload Documents
    field :update_upload_document, mutation: Mutations::Claim::UpdateUploadDocument
    # Delete Documents
    field :delete_document, mutation: Mutations::Claim::DeleteDocument
  end
end
