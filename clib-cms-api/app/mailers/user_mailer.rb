# User mailer setup
class UserMailer < ApplicationMailer
  default from: 'testclib2021@gmail.com'

  def new_user(user, password)
    @user = user
    @password = password
    mail(to: @user.email, subject: '[CONFIDENTIAL] CLIB CMS - New Account')
  end

  def password_reset(user, password)
    @user = user
    @password = password
    mail(to: @user.email, subject: '[CONFIDENTIAL] CLIB CMS - Reset Password')
  end
end
