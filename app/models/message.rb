class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :conversation

  validates_presence_of :body

  after_create :mark_unread

  private

  def mark_unread
    self.conversation.user_conversations.each do |user_convo|
      user_convo.read = false
      user_convo.save
    end
  end
end
