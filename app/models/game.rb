class Game < ActiveRecord::Base
  belongs_to :owner, class_name: "User", foreign_key: 'creator_id'

  has_many :moves

  def create_moves(moves_array)
    moves = JSON.parse(moves_array)
    moves.each do |move|
      move = Move.new(move)
      move.game_id = self.id
      move.save
    end
  end

end
