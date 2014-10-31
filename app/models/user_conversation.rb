class UserConversation < ActiveRecord::Base
  belongs_to :user
  belongs_to :conversation
  has_many :messages, :through => :conversation

  accepts_nested_attributes_for :conversation

  before_validation :check_for_recips

  delegate :subject, :to => :conversation
  delegate :users, :to => :conversation

  attr_accessor :to
  before_create :create_user_conversations

  def users_that_are_not_me(user_id)
    return self.users.where.not(id: user_id)
  end

  private

  def create_user_conversations
    return if to.blank?

    to.each do |recip_id|
      UserConversation.create :user_id => recip_id, :conversation => conversation
    end
  end

  def check_for_recips
    return if to.blank?
    recip_ids = to.reject &:blank?
    self.errors.add(:base, "Sorry! I couldn't find anyone with that handle") if recip_ids.empty?
  end

end
