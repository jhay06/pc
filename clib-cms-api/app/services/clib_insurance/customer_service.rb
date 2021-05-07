module ClibInsurance
  # Customer service
  class CustomerService < ClibInsurance::BaseService
    class << self
      def list(request)
        ClibInsurance::RequestService.get(34, request)
      end

      def info(request)
        ClibInsurance::RequestService.get(20, request)
      end

      def cocs(request)
        ClibInsurance::RequestService.get(33, request)
      end

      def claims(request)
        ClibInsurance::RequestService.get(35, request)
      end
    end
  end
end
