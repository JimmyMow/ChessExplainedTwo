class RegistrationsController < Devise::RegistrationsController
  after_filter :log_user_online_after_sign_up, only: [:create]

  def log_user_online_after_sign_up
    current_user.is_now_online
  end
end
