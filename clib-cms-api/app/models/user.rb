class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword
  field :email, type: String
  field :username, type: String
  field :employee_id, type: String
  field :fullname, type: String
  field :encrypted_password, type: String
  field :password_digest, type: String
  field :is_admin, type: Boolean
  field :immediate_head, type: String
  field :section_unit, type: String
  field :designation, type: String
  field :deleted_at, type: DateTime, default: false
  field :is_temporary_password, type: Boolean, default: true
  belongs_to :region, optional: true
  belongs_to :area_code, optional: true

  index({ deleted_at: 1 })

  has_secure_password

  validates :email, presence: true, uniqueness: true,
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :fullname, presence: true, uniqueness: true
  validates :employee_id, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :immediate_head, presence: true
  validates :section_unit, presence: true
  validates :designation, presence: true
  
  # Overide User.all
  def self.all
    where(deleted_at: false)
  end

  # Soft deleted set delete_at to Time.now
  def soft_delete
    self.deleted_at = Time.now
    save
  end
end
