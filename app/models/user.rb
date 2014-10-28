class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :handle, uniqueness: true

  validates :handle, presence: true
  validates :name, presence: true

  has_many :games, class_name: "Game", foreign_key: "creator_id"

  def is_game_owner?(game)
    game.creator_id == self.id
  end

  def is_now_online
    self.is_online = true
    self.save
  end

  def is_now_offline
    self.is_online = false
    self.save
  end
end
