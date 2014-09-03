class WebsocketHomeController < WebsocketRails::BaseController
  def client_connected
  end

  def delete_user
    connection_store[:online_users] = nil
    broadcast_user_list
  end

  def new_user
    username = current_user ? current_user.email : "Anonymous"

    connection_store[:online_users] = { user_name: username }
    broadcast_user_list
  end

  def broadcast_user_list
    users = connection_store.collect_all(:online_users)
    broadcast_message :user_list, users
  end
end
