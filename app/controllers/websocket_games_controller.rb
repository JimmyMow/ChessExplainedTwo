class WebsocketGamesController < WebsocketRails::BaseController
  def position_board
    WebsocketRails[message[:channel_name].to_sym].trigger :position_board, {
      position: message[:position],
      board: message[:board]
    }
  end

  def start
    puts message[:board]
    WebsocketRails[message[:channel_name].to_sym].trigger :start_position, {
      board: message[:board]
    }
  end

  def clear
    WebsocketRails[message[:channel_name].to_sym].trigger :clear_position, {
      board: message[:board]
    }
  end

  def trigger_variation
    WebsocketRails[message[:channel_name].to_sym].trigger :trigger_variation
  end
end
