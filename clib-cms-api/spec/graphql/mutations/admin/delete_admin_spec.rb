require 'rails_helper'

module Mutations
  module Admin
    RSpec.describe DeleteAdmin, type: :request do
      let!(:superadmin) { create(:user) }
      let!(:admin) { create(:user) }
      let!(:admin1) { create(:user) }
      let!(:user) { create(:user) }

      context 'when user is current_user' do
        it 'delete user admin' do
          token = login_admin(superadmin)

          post '/graphql', {
            headers: { 'Authorization': token },
            params: { query: mutation(superadmin.id.to_s) }
          }
          json = JSON.parse(response.body)
          data = json['data']['deleteAdmin']
          expect(data['user']).to eq nil
          expect(data['errors']).to eq ['Not allowed to do this action']
        end
      end

      context 'when user is already deleted' do
        describe '#resolve' do
          it 'delete user admin' do
            admin1.update(deleted_at: Time.now)
            token = login_admin(superadmin)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: mutation(admin1.id.to_s) }
            }
            json = JSON.parse(response.body)
            data = json['data']['deleteAdmin']
            expect(data['user']).to eq nil
            expect(data['errors']).to eq ['User not found']
          end
        end
      end

      context 'user' do
        describe '#resolve' do
          it 'delete user admin' do
            token = login_admin(superadmin)
            post '/graphql', {
              headers: { 'Authorization': token },
              params: { query: mutation(user.id.to_s) }
            }
            json = JSON.parse(response.body)
            data = json['data']['deleteAdmin']
            expect(data['user']['id']).to eq user.id.to_s
            expect(data['user']['email']).to eq user.email.to_s
          end
        end
      end

      def mutation(id)
        <<~GQL
          mutation {
            deleteAdmin(input: {
              id: "#{id}"
            }) {
              user {
                id
                email
                username
              }
              errors
            }
          }
        GQL
      end
    end
  end
end
