class WebsocketGamesController < WebsocketRails::BaseController
  def position_sandbox
    WebsocketRails[message[:channel_name].to_sym].trigger :send_move, {
      position: message[:fen_position]
    }
  end
end
