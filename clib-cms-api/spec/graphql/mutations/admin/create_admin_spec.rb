require 'rails_helper'

module Mutations
  module Admin
    RSpec.describe CreateAdmin, type: :request do
      describe '#resolve' do
        let!(:cardo) { create(:user) }
        let!(:region) { create(:region) }
        let!(:area_code) { create(:area_code) }

        it 'create user admin' do
          token = login_admin(cardo)
          attributes = {
            email: 'coco@martin.io',
            username: 'coco',
            employee_id: '2021-00122',
            fullname: 'Coco5 Martin',
            immediate_head: 'James Dela Cruz',
            section_unit: 'claims_unit',
            designation: 'claims_lead'
          }

          post '/graphql', {
            headers: { 'Authorization': token },
            params: {
              query: mutation(
                attributes,
                region.name,
                area_code.name
              )
            }
          }
          json = JSON.parse(response.body)
          data = json['data']['createAdmin']
          expect(data['user']['email']).to eq 'coco@martin.io'
          expect(data['user']['username']).to eq 'coco'
          expect(data['user']['sectionUnit']).to eq 'claims_unit'
          expect(data['user']['immediateHead']).to eq 'James Dela Cruz'
        end
      end

      def mutation(attributes, region, area_code)
        <<~GQL
          mutation {
            createAdmin(input: {
              attributes: {
                email: "#{attributes[:email]}",
                username: "#{attributes[:username]}",
                employeeId: "#{attributes[:employee_id]}",
                fullname: "#{attributes[:fullname]}",
                immediateHead: "#{attributes[:immediate_head]}",
                sectionUnit: "#{attributes[:section_unit]}",
                designation: "#{attributes[:designation]}",
              },
              region: "#{region}",
              areaCode: "#{area_code}"
            }) {
              user {
                id
                email
                fullname
                employeeId
                username
                immediateHead
                sectionUnit
                designation
                region {
                    name
                    areaCode {
                        name
                    }
                }
              }
              errors
            }
          }
        GQL
      end
    end
  end
end
