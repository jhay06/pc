module ClibInsurance
  # Branch services
  class BranchService < ClibInsurance::BaseService
    class << self
      def list(request)
        ClibInsurance::RequestService.get(32, request)
      end
    end
  end
end
