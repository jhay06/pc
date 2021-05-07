require 'faraday'
require 'json'

module ClibInsurance
  # Connection services
  class ConnectionService < ClibInsurance::BaseService
    HEADERS = { 'typ': 'JWT', 'alg': 'RS256' }.freeze
    ACCESS_DATE = DateTime.now.strftime('%m/%d/%Y %H:%M:%S')
    PAYLOAD = { 'AppVersion': '0.1.0', 'AppName': 'CLIB CMS', 'AccessDate': ACCESS_DATE }.freeze
    PRIVATE_KEY_PEM = File.read('./private_key.pem')
    PRIVATE_KEY = OpenSSL::PKey::RSA.new(PRIVATE_KEY_PEM)
    TOKEN = JWT.encode(PAYLOAD, PRIVATE_KEY, 'RS256', HEADERS)
    REQUEST_HEADERS = {
      "X-API-Key": ENV['CLIB_INSURANCE_X_API_KEY'],
      "Content-Type": 'application/json',
      "Authorization": "Bearer #{TOKEN}"
    }.freeze

    class << self
      def api
        Faraday.new(url: ENV['CLIB_INSURANCE_URL']) do |faraday|
          faraday.response :logger
          faraday.adapter Faraday.default_adapter
          faraday.headers = REQUEST_HEADERS
        end
      end
    end
  end
end
