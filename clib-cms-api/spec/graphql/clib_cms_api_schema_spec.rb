require 'rails_helper'

RSpec.describe 'ClibCmsApiSchema' do
  let(:working_schema) { ClibCmsApiSchema.to_definition }
  let(:current_schema) do
    File.read(Rails.root.join('schema.graphql'))
  end

  it 'updates the schema with `$ docker-compose run --rm clib-cms-api bundle exec rake graphql:schema:dump`' do
    expect(working_schema).to eq current_schema
  end
end
