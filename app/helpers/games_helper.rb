module GamesHelper
  def game_invite_link(game)
    return "#{request.host}:#{request.port}/games/#{game.id}/review/?token=#{game.sessionId}"
  end

  def game_invite_route(game)
    return "/games/#{game.id}/review/?token=#{game.sessionId}"
  end

  def convert_rating(rating)
    return rating == "?" ? "No rating" : rating
  end
end
