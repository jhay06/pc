FactoryBot.define do
  factory :user do
    email                   { FFaker::Internet.email }
    username                { FFaker::Name.first_name }
    fullname                { FFaker::Name.unique.name }
    employee_id             { SecureRandom.hex(10) }
    password                { "password" }
    password_confirmation   { "password" }
    is_admin                { true }
    immediate_head          { FFaker::Name.unique.name }
    section_unit            { FFaker::Name.unique.name }
    designation             { FFaker::Name.unique.name }
    is_temporary_password   { true }
    deleted_at              { false }
  end
end
