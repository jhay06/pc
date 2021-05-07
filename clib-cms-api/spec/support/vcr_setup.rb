VCR.configure do |config|
  config.cassette_library_dir = "#{::Rails.root}/spec/fixtures"
  config.hook_into :webmock
  config.ignore_localhost = true
  config.configure_rspec_metadata!
end

RSpec.configure do |c|
  # so we can use :vcr rather than :vcr => true;
  # in RSpec 3 this will no longer be necessary.
  c.treat_symbols_as_metadata_keys_with_true_values = true
end
