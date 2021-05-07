require 'rails_helper'
module Queries
  RSpec.describe SectionUnits, type: :request do
    describe '.resolve' do
      let!(:cardo) { create(:user) }
      let!(:claims) { create(:section_unit, name: 'claims') }
      let!(:sales) { create(:section_unit, name: 'sales') }

      context 'authenticate' do
        it 'returns all section units' do
          token = login_admin(cardo)
          post '/graphql', {
            headers: { 'Authorization': token },
            params: { query: query }
          }
          json = JSON.parse(response.body)
          data = json['data']['sectionUnits']

          expect(data).to match_array [
            hash_including(
              'id' => be_present,
              'name' => claims.name.to_s
            ),
            hash_including(
              'id' => be_present,
              'name' => sales.name.to_s
            )
          ]
        end
      end
    end

    def query
      <<~GQL
        query {
          sectionUnits {
            id
            name
          }
        }
      GQL
    end
  end
end
