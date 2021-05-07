class JsonWebToken
  class << self
    SIGNATURE_ALGORITHM = 'HS512'.freeze
    JWT_SECRET = ENV['JWT_SECRET']

    def encode(payload)
      payload[:exp] = 24.hours.from_now.to_i
      ::JWT.encode(payload, JWT_SECRET, SIGNATURE_ALGORITHM)
    end

    def decode(token)
      ::JWT.decode(token, JWT_SECRET, true, algorithm: SIGNATURE_ALGORITHM)
      rescue JWT::DecodeError, JWT::VerificationError => e
        raise ExceptionHandler::DecodeError, e.message
    end
  end
end
