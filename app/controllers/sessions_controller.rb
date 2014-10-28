class SessionsController < Devise::SessionsController
  before_filter :log_user_offline, only: [:destroy]
  after_filter :log_user_online, only: [:create]

  private

  def log_user_offline
    current_user.is_now_offline
  end

  def log_user_online
    current_user.is_now_online
  end

end
