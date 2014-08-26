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

  def close_variation
    WebsocketRails[message[:channel_name].to_sym].trigger :close_variation
  end

  def update_variation_game
    WebsocketRails[message[:channel_name].to_sym].trigger :update_variation_game, {
      pgn: message[:pgn]
    }
  end

  def add_variation_move
    WebsocketRails[message[:channel_name].to_sym].trigger :add_variation_move, {
      move: message[:move],
      directions: message[:directions],
      moveNum: message[:moveNum]
    }
  end

  def show_variations
    WebsocketRails[message[:channel_name].to_sym].trigger :show_variations, {
      moveObject: message[:move_object],
    }
  end

  def adjust_move_counter
    WebsocketRails[message[:channel_name].to_sym].trigger :adjust_move_counter, {
      counter: message[:counter],
      board: message[:board]
    }
  end

  def highlight_pgn
    WebsocketRails[message[:channel_name].to_sym].trigger :highlight_pgn, {
      pgn: message[:pgn]
    }
  end
end
