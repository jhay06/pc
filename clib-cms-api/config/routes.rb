# frozen_string_literal: true

Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if %w[development staging].include? Rails.env
  post '/graphql', to: 'graphql#execute'
  post '/', to: 'graphql#execute', as: 'root'
  get '/', to: proc {
    [
      200,
      {},
      [
        "{'message':'ok', 'build': 'IM GOOD'}"
      ]
    ]
  }

  mount LetterOpenerWeb::Engine, at: '/clib/mailers' if Rails.env.development?
end
