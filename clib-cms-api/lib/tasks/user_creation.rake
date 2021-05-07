desc 'Create User account rake users:create EMAIL= USERNAME= PASSWORD= ROLE= EMPLOYEEID= FULLNAME='

namespace :users do
  task create: :environment do
    user = User.find_or_create_by(
      email: ENV['EMAIL'],
      username: ENV['USERNAME'],
      password: ENV['PASSWORD'],
      password_confirmation: ENV['PASSWORD'],
      is_admin: ENV['ROLE'] == 'admin',
      employee_id: ENV['EMPLOYEEID'],
      fullname: ENV['FULLNAME'],
      section_unit: ENV['SECTION_UNIT'],
      immediate_head: ENV['IMMEDIATE_HEAD'],
      designation: ENV['DESIGNATION']
    )
    puts user.valid? ? "User #{user.email} created completed!" : "Invalid: Error => #{user.errors.full_messages}"
  end
end
