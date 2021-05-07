# New admin user jobs
class NewAdminUserJob < ApplicationJob
  queue_as :default

  def perform(user_id, password)
    user = User.find(user_id)
    UserMailer.new_user(user, password).deliver
  end
end
