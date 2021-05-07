module Types
  # Customer type object from clib api
  class CustomerType < Types::BaseObject
    field :insurance_customer_no, String, null: true
    field :fullname, String, null: true
    field :first_name, String, null: true
    field :middle_name, String, null: true
    field :last_name, String, null: true
    field :date_of_birth, String, null: true
    field :place_of_birth, String, null: true
    field :gender, String, null: true
    field :valid_id_presented, String, null: true
    field :valid_id_number, String, null: true
    field :mobile_number, String, null: true
    field :landline, String, null: true
    field :email_address, String, null: true
    field :nationality, String, null: true
    field :civil_status, String, null: true
    field :source_of_funds, String, null: true
    field :nature_of_work, String, null: true
    field :address, String, null: true
    field :city, String, null: true
    field :zip_code, String, null: true

    def address
      object['address']
    end

    def city
      object['city']
    end

    def zip_code
      object['zipCode']
    end

    def fullname
      "#{first_name} #{middle_name} #{last_name}"
    end

    def first_name
      object['firstName']
    end

    def insurance_customer_no
      object['insuranceCustomerNo']
    end

    def middle_name
      object['middleName']
    end

    def last_name
      object['lastName']
    end

    # TODO: Convert to readable time
    def date_of_birth
      object['dateOfBirth']
    end

    def place_of_birth
      object['placeOfBirth']
    end

    def valid_id_presented
      object['validIDPresented']
    end

    def valid_id_number
      object['validIDNumber']
    end

    def email_address
      object['emailAddress']
    end

    def mobile_number
      object['mobileNumber']
    end

    def civil_status
      object['civilStatus']
    end

    def source_of_funds
      object['sourceOfFunds']
    end

    def nature_of_work
      object['natureOfWork']
    end
  end
end
