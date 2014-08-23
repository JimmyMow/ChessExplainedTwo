class VariationsController < ApplicationController
  def create
    @variation = Variation.create(move_id: params[:variation][:move_id])

    moves = JSON.parse(params[:variation][:variation_moves])
    moves.each do |move|
      move = VariationMove.new(move)
      move.variation_id = @variation.id
      move.save
    end

    respond_to do |format|
      format.js
    end
  end
end
