require 'rails_helper'

module Mutations
  module Admin
    RSpec.describe UpdateAdmin, type: :request do
      describe '#resolve' do
        let!(:cardo) { create(:user) }
        let!(:dalisay) { create(:user) }
        let!(:region) { create(:region) }
        let!(:area_code) { create(:area_code, region: region) }

        it 'update user admin' do
          token = login_admin(cardo)
          attributes = {
            username: 'username1',
            fullname: 'Full name1',
            email: 'username-edited@sample.com',
            immediate_head: 'James Dela Cruz',
            section_unit: 'claims_unit',
            designation: 'claims_lead',
            employee_id: '0409'
          }

          post '/graphql', {
            headers: { 'Authorization': token },
            params: { query: mutation(
              dalisay.id.to_s,
              attributes,
              region.name,
              area_code.name
            ) }
          }
          json = JSON.parse(response.body)
          data = json['data']['updateAdmin']
          expect(data['user']['id']).to eq dalisay.id.to_s
          expect(data['user']['username']).to eq 'username1'
        end
      end

      def mutation(id, attributes, region, area_code)
        <<~GQL
          mutation {
            updateAdmin(input: {
              id: "#{id}",
              attributes: {
                username: "#{attributes[:username]}",
                email: "#{attributes[:email]}",
                employeeId: "#{attributes[:employee_id]}",
                fullname: "#{attributes[:fullname]}",
                immediateHead: "#{attributes[:immediate_head]}",
                sectionUnit: "#{attributes[:section_unit]}",
                designation: "#{attributes[:designation]}"
              },
              region: "#{region}",
              areaCode: "#{area_code}"
            }) {
              user {
                id
                email
                username
                employeeId
                immediateHead
                sectionUnit
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
