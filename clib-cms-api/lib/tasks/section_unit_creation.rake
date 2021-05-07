desc 'Create section units with designation rake section_units:create SECTION=claims DESIGNATION=test,test2,test3'

namespace :section_units do
  task create: :environment do
    section_unit = SectionUnit.find_or_create_by(name: ENV['SECTION'])
    ENV['DESIGNATION'].split(',').each do |designation|
      section_unit.designations.find_or_create_by(name: designation)
    end

    puts "Section Unit = #{section_unit.name} with Designation #{ENV['DESIGNATION']}"
  end
end
