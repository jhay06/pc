module LoginHelpers
  def login_admin(admin)
    post '/graphql', params: { query: login_mutation(admin.email, 'password') }
    json = JSON.parse(response.body)
    data = json['data']['login']
    data['token']
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
