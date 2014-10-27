class Game < ActiveRecord::Base
  validates :sessionId, presence: true

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

  def create_details(details_array)
    game_details = JSON.parse(details_array)
    self.white_player = game_details["White"]
    self.black_player = game_details["Black"]

    self.white_rating = game_details["WhiteElo"]
    self.black_rating = game_details["BlackElo"]

    self.opening = game_details["Opening"]

    self.result = game_details["Result"]

    self.event = game_details["Event"]
  end

end
