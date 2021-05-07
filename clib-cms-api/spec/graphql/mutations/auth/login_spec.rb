require 'rails_helper'

module Mutations
  module Auth
    RSpec.describe Login, type: :request do
      let!(:user) { create(:user) }

      describe "#resolve" do
        context "valid username and password" do
          it "should return token exp and user details" do
            
            post '/graphql', params: { query: login_mutation(user.username, "password") }
            json = JSON.parse(response.body)
            data = json['data']['login']
            
            expect(data['token']).to be_present
            expect(data['exp']).to be_present
            expect(data['errors']).not_to be_present
            expect(data['user']['email']).to eq(user.email)
            expect(data['user']['username']).to eq(user.username)
          end
        end

        context "valid email and password" do
          it "should return token exp and user details" do
            
            post '/graphql', params: { query: login_mutation(user.email, "password") }
            json = JSON.parse(response.body)
            data = json['data']['login']
            
            expect(data['token']).to be_present
            expect(data['exp']).to be_present
            expect(data['errors']).not_to be_present
            expect(data['user']['email']).to eq(user.email)
            expect(data['user']['username']).to eq(user.username)
          end
        end

        context "invalid username and password" do
          it "should return token exp and user details" do
            
            post '/graphql', params: { query: login_mutation("#{user.email}1", "password") }
            json = JSON.parse(response.body)
            data = json['data']['login']
            
            expect(data['token']).to be_nil
            expect(data['exp']).to be_nil
            expect(data['user']).to be_nil
            expect(data['errors']).to eq(["Invalid email or password"])
          end
        end
      end

      def login_mutation(username, password)
        <<~GQL
          mutation {
            login(input: {
              username: "#{username}",
              password: "#{password}"
            }) {
              token
              exp
              errors
              user {
                id
                email
                username
              }
            }
          }
        GQL
      end
    end
  end
end
