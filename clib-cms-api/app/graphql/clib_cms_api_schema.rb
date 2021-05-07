class ClibCmsApiSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST
  # Error handling
  use GraphQL::Execution::Errors

  # Add built-in connections for pagination
  use GraphQL::Pagination::Connections
end
