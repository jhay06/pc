module Types
  # Submitted documents type object from clib api
  class SubmittedDocumentType < Types::BaseObject
    field :document_name, String, null: false
    field :file_name, String, null: false
    field :file_type, String, null: false
    field :file_image, String, null: false

    def document_name
      object['documentName']
    end

    def file_name
      object['fileName']
    end

    def file_type
      object['fileType']
    end

    def file_image
      object['fileImageData']
    end
  end
end
