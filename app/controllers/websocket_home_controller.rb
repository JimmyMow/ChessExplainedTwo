class WebsocketGamesController < WebsocketRails::BaseController
  def client_connected
    connection_store[:online_users] = { user_name: current_user.email || "Anonymous" }
    broadcast_user_list
  end

  def client_disconnected
    connection_store[:online_users] = nil
    broadcast_user_list
  end

  def broadcast_user_list
    users = connection_store.collect_all(:user)
    broadcast_message :user_list, users
  end
end
