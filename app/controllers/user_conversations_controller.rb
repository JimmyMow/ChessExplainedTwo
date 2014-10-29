class UserConversationsController < ApplicationController
  before_action :set_conversation, only: [:show]

  def index
    @user = User.find params[:user_id]
    @conversations = @user.user_conversations
  end

  def show

  end

  def new
    redirect_to redirect_to_back_or_root("You need to be signed in to send a message") unless current_user

    @user = User.find params[:user_id]
    @conversation = @user.user_conversations.build
    @conversation.build_conversation.messages.build
  end

  def create
    redirect_to redirect_to_back_or_root("You need to be signed in to send a message") unless current_user

    @conversation = UserConversation.new(user_conversation_params)
    @conversation.user = current_user
    @conversation.conversation.messages.first.user = current_user
    @conversation.save!
    redirect_to user_conversation_path(current_user, @conversation)
  end

  def mark_as_read
    @conversation = UserConversation.find params[:id]
    @conversation.update_attributes :read => true
    redirect_to user_conversation_path(current_user, @conversation)
  end

  def mark_as_unread
    @conversation = UserConversation.find params[:id]
    @conversation.update_attributes :read => false
    redirect_to user_conversation_path(current_user, @conversation)
  end

  private

  def set_conversation
    @conversation = UserConversation.find params[:id]
  end

  def user_conversation_params
    # Parameters: {"utf8"=>"✓", "authenticity_token"=>"yqQGPvVx//R8aD7Ki/LaQ8JnWrjx8pUvXquQK2OP39A=", "user_conversation"=>{"to"=>["2"], "conversation_attributes"=>{"subject"=>"Yoo bobby", "messages_attributes"=>{"0"=>{"body"=>"hey"}}}}, "commit"=>"Create User conversation", "user_id"=>"1"}
    params.require(:user_conversation).permit(to: [], conversation_attributes: [:subject, messages_attributes: [:body]])
  end
end
