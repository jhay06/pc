desc 'Create User account rake users:create EMAIL=admin@clib.com USERNAME=admin PASSWORD=password'

SECTION_UNITS = [
  { 'name' => 'Claims Unit', 'value' => 'claims_unit', 'designations' =>
    [
      { 'name' => 'Claims Lead', 'value' => 'claims_lead' },
      { 'name' => 'Claims Section Head', 'value' => 'claims_section_head' },
      { 'name' => 'Claims Department Head', 'value' => 'claims_department_head' },
      { 'name' => 'Claims Division Head', 'value' => 'claims_division_head' }
    ] },

  { 'name' => 'Sales', 'value' => 'sales', 'designations' =>
    [
      { 'name' => 'Insurance Specialist', 'value' => 'insurance_specialist' },
      { 'name' => 'Insurance Officer', 'value' => 'insurance_officer' },
      { 'name' => 'Operations Manager', 'value' => 'operations_manager' },
      { 'name' => 'Division Manager', 'value' => 'division_manager' }
    ] },

  { 'name' => 'Group Head', 'value' => 'group_head', 'designations' =>
    [
      { 'name' => 'Group Head', 'value' => 'group_head' }
    ] },

  { 'name' => 'Accounting', 'value' => 'accounting', 'designations' =>
    [
      { 'name' => 'Disbursement Staff', 'value' => 'disbursement_staff' },
      { 'name' => 'Accounting Head', 'value' => 'accounting_head' }

    ] },

  { 'name' => 'Insurer', 'value' => 'insurer', 'designations' =>
    [
      { 'name' => 'Pioneer Claims', 'value' => 'pioneer_claims' }
    ] }
].freeze

REGIONS = [
  {
    'name' => 'R1A',
    'area_codes' =>
    [
      { 'name' => '101', 'branches' =>
        [
          { 'code' => '10104', 'name' => 'CLH Calumpang' },
          { 'code' => '60540', 'name' => 'CLH Burgos Makati' }
        ] },

      { 'name' => '103', 'branches' =>
        [
          { 'code' => '61548', 'name' => 'Clh Imperial-Cubao' },
          { 'code' => '10821', 'name' => 'CLH Sacramento' }
        ] },

      { 'name' => '104', 'branches' =>
        [
          { 'code' => '10416', 'name' => 'Clh Pritil' }
        ] }
    ]
  },

  {
    'name' => 'R1B', 'area_codes' => [{ 'name' => '109', 'branches' =>
        [
          { 'code' => '10818', 'name' => 'CLH Pasong Tirad' },
          { 'code' => '10814', 'name' => 'CLH Metropolitan' }
        ] }]
  },

  {
    'name' => 'R2A', 'area_codes' => [{ 'name' => '202', 'branches' => [{ 'code' => '10811', 'name' => 'CLH JP 2' }] }]
  },
  {
    'name' => 'R2B', 'area_codes' => [{ 'name' => '204', 'branches' => [{ 'code' => '61040', 'name' => 'CLH IT Park' }] }]
  },
  {
    'name' => 'R3', 'area_codes' => [{ 'name' => '303', 'branches' => [{ 'code' => '30312', 'name' => 'Clh Tanza 1' }] }]
  },
  {
    'name' => 'R4A', 'area_codes' => [{ 'name' => '413', 'branches' => [{ 'code' => '40212', 'name' => 'Clh Masbate 1' }] }]
  },
  {
    'name' => 'R4B', 'area_codes' => [
      { 'name' => '405', 'branches' =>
        [
          { 'code' => '40402', 'name' => 'CLH Colon 1' }
        ] },
      { 'name' => '415', 'branches' =>
        [
          { 'code' => '61347', 'name' => 'CLH Dumalag' }
        ] }
    ]
  }

].freeze

namespace :admin do
  task seed_section_units: :environment do
    SECTION_UNITS.each do |unit|
      section_unit = SectionUnit.find_or_create_by!(unit.except('designations'))
      unit['designations'].each do |designation|
        Designation.find_or_create_by!(designation.merge(section_unit: section_unit))
      end
    end

    puts 'You are successfully created all the section units need..'
  end

  task seed_regions: :environment do
    REGIONS.each do |region|
      reg = Region.find_or_create_by!(region.except('area_codes'))
      region['area_codes'].each do |area_code|
        ac = AreaCode.find_or_create_by!(area_code.except('branches').merge(region: reg))

        area_code['branches'].each do |branch|
          Branch.find_or_create_by!(branch.merge(area_code: ac))
        end
      end
    end

    puts 'You are successfully created all the branches needed..'
  end

  task create: :environment do
    Rake::Task['admin:seed_section_units'].invoke
    Rake::Task['admin:seed_regions'].invoke

    user = User.find_or_create_by(
      email: ENV['EMAIL'],
      username: ENV['USERNAME'],
      password: ENV['PASSWORD'],
      password_confirmation: ENV['PASSWORD'],
      is_admin: true,
      employee_id: 'XXXXX',
      fullname: 'YYYYYYY',
      section_unit: 'claims_unit',
      immediate_head: 'ZZZZZZZ',
      designation: 'claims_section_head'
    )

    puts user.valid? ? "User #{user.email} created completed!" : "Invalid: Error => #{user.errors.full_messages}"
  end

  task cleanup: :environment do
    users = User.or(
      { :immediate_head.in => ['', nil] },
      { :section_unit.in => ['', nil] },
      { :designation.in => ['', nil] },
      { :region.in => ['', nil] }
    )
    users.destroy_all
    puts 'Database clean up successfully.'
  end
end
