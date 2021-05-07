module Types
  # Customer type object from clib api
  class DocumentType < Types::BaseObject
    field :required_documents, [String], null: false
    field :submitted_documents, [Types::SubmittedDocumentType], null: false

    def required_documents
      object['requiredDocuments']
    end

    def submitted_documents
      object['submittedDocs']
    end
  end
end
