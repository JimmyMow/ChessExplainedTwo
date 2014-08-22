class Move < ActiveRecord::Base
  validates :notation, :fen, :game_id, presence: true

  belongs_to :game
  has_many :variations
  has_many :variation_moves, through: :variations
end
