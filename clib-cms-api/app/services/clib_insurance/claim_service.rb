module ClibInsurance
  # Claim Service
  class ClaimService < ClibInsurance::BaseService
    class << self
      def documents(request)
        ClibInsurance::RequestService.get(36, request)
      end

      def add_new(request)
        ClibInsurance::RequestService.get(39, request)
      end

      def update(request)
        ClibInsurance::RequestService.get(38, request)
      end

      def status(request)
        ClibInsurance::RequestService.get(40, request)
      end
    end
  end
end
