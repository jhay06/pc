# frozen_string_literal: true

Bugsnag.configure do |config|
  config.api_key = 'bd1b563c2baca5d36b7d8fb47ba14574'
  config.notify_release_stages = %w[production staging]
end
