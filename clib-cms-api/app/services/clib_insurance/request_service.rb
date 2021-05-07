require 'faraday'
require 'json'

module ClibInsurance
  # Request service handle request POST connection
  class RequestService < ClibInsurance::BaseService
    class << self
      def get(type, params = {})
        data, type = post_json(type, params)
        type == 'Success' ? success_reponse(data, type) : error_response(data, type)
      end

      def post_json(type, params = {})
        response = api.post('InsuranceGateway') do |req|
          req.body = request_body(type, params).to_json
        end
        response_body = response.body
        response_body = response_body.split('<html>').first if response_body.include?('<html>')
        [parse_response(response_body), parse_response(response_body)['type']]
      end

      def reponse_body_data(response_body)
        if parse_response(response_body, 'data').nil?
          parse_response(response_body, 'message')
        else
          parse_response(response_body, 'data')
        end
      end

      def api
        ClibInsurance::ConnectionService.api
      end

      def parse_response(response_body)
        JSON.parse(JSON.parse(response_body)['Result'])
      end
    end
  end
end
