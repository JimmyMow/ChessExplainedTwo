class Variation < ActiveRecord::Base
  belongs_to :move
  has_many :variation_moves

  def current_move

  end
end
