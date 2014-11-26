class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :handle, uniqueness: true

  validates :handle, presence: true
  validates :name, presence: true

  has_many :games, class_name: "Game", foreign_key: "creator_id"
  has_many :user_conversations
  has_many :conversations, through: :user_conversations
  has_many :messages, through: :conversations

  def self.terms_for(prefix)
    suggestions = User.where("handle ILIKE :search", search: "%#{prefix.downcase}%" )
    suggestions.order("handle ASC").limit(10)
  end

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

  def unread_messages
    self.user_conversations.where(read: [nil, false])
  end
end
