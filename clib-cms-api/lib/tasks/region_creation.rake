desc 'Create regions data rake regions:create REGION= AREACODE= BRANCHCODE= BRANCHNAME= '

namespace :regions do
  task create: :environment do
    region = Region.find_by(name: ENV['REGION'])

    if region.present?
      # find area code base on region
      area_code = region.area_codes.find_by(name: ENV['AREACODE'])

      if area_code.present?
        # find branch base on area code
        branch = area_code.branches.find_by(name: ENV['BRANCHNAME'])
        if branch.present?
          # update branch name and code
          branch.update(name: ENV['BRANCHNAME'], code: ENV['BRANCHCODE'])
        else
          # create new branch record
          area_code.branches.create(name: ENV['BRANCHNAME'], code: ENV['BRANCHCODE'])
        end
      else
        # create area code record
        area_code = region.area_codes.create(name: ENV['AREACODE'])
        # create branch record
        area_code.branches.create(name: ENV['BRANCHNAME'], code: ENV['BRANCHCODE'])
      end
    else
      # Create new record from region to area code to branches
      region = Region.create(name: ENV['REGION'])
      area_code = region.area_codes.create(name: ENV['AREACODE'])
      area_code.branches.create(name: ENV['BRANCHNAME'], code: ENV['BRANCHCODE'])
    end
  end
end
