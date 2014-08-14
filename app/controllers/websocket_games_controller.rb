class WebsocketGamesController < WebsocketRails::BaseController
  def position_sandbox
    WebsocketRails[message[:channel_name].to_sym].trigger :send_move, {
      position: message[:fen_position]
    }
  end

  def start
    puts "HERE"
    WebsocketRails[message[:channel_name].to_sym].trigger :start_position
  end

  def clear
    WebsocketRails[message[:channel_name].to_sym].trigger :clear_position
  end
end
