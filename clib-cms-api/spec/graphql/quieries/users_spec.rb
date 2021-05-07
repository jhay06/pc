require 'rails_helper'
module Queries
  RSpec.describe Users, type: :request do
    describe '.resolve' do
      let!(:cardo) { create(:user) }
      let!(:dalisay) { create(:user) }
      context '!authenticate' do
        it 'return error message' do
          post '/graphql', {
            headers: { "Authorization": '' },
            params: { query: query }
          }

          json = JSON.parse(response.body)
          expect(json['errors'].first['message']).to eq 'You need to authenticate to perform this action'
        end
      end

      context 'authenticate' do
        it 'returns all users' do
          token = login_admin(cardo)
          post '/graphql', {
            headers: { 'Authorization': token },
            params: { query: query }
          }
          json = JSON.parse(response.body)
          data = json['data']['users']
          expect(data).to match_array [
            hash_including(
              'id' => be_present,
              'email' => cardo.email.to_s,
              'username' => cardo.username.to_s
            ),
            hash_including(
              'id' => be_present,
              'email' => dalisay.email.to_s,
              'username' => dalisay.username.to_s
            )
          ]
        end
      end
    end

    def query
      <<~GQL
        query {
          users {
            id
            email
            username
          }
        }
      GQL
    end
  end
end
