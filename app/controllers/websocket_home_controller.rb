class WebsocketHomeController < WebsocketRails::BaseController
  def client_connected
    connection_store[:online_people] = 0
  end

  def delete_user
    connection_store[:online_users] = nil
    connection_store[:online_people] = nil

    broadcast_user_list
    broadcast_online_people_count
  end

  def new_user
    if user_signed_in?
      connection_store[:online_users] = { user_name: current_user.handle, id: current_user.id }
    else
      connection_store[:online_users] = nil
    end

    connection_store[:online_people] += 1

    broadcast_user_list
    broadcast_online_people_count
  end

  def broadcast_user_list
    users = connection_store.collect_all(:online_users)
    broadcast_message :user_list, users
  end

  def broadcast_online_people_count
    people = connection_store.collect_all(:online_people).reduce(:+)
    broadcast_message :people_count, people
  end
end
