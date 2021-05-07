module ClibInsurance
  # Base services
  class BaseService
    class << self
      def request_body(type, request)
        body = {}
        body['ApiKey'] = ENV['CLIB_INSURANCE_APIKEY']
        body['RequestType'] = type
        body['Request'] = request.to_json
        body
      end

      def success_reponse(data, type)
        [to_camelcase(data), type]
      end

      def error_response(data, type)
        [data, type]
      end

      def to_camelcase(data)
        if data.instance_of?(Array)
          data.each { |obj| obj.deep_transform_keys! { |k| k.camelize(:lower) } }
        else
          data.deep_transform_keys! { |k| k.camelize(:lower) }
        end
      end
    end
  end
end
