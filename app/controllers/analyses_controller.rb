class AnalysesController < ApplicationController
  def create
    engine = Stockfish::Engine.new

    @game = Game.find(params[:game_id])
    @game.moves.each do |move|
      output = engine.analyze move.fen, { :movetime => 2000 }
      cp_number = output.last[output.last.index("score")...output.last.index("nodes")].strip.split(" ").last
      eval = cp_number.to_i/100.00
      move.eval = eval
      move.save
    end

    respond_to do |format|
      format.html
      format.js
    end
  end
end
