class Move < ActiveRecord::Base
  validates :notation, :fen, :game_id, presence: true

  belongs_to :game
end
