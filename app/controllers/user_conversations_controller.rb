class UserConversationsController < ApplicationController
  before_action :set_conversation, only: [:show]
  before_action :check_for_present_user, only: [:new, :create]
  before_action :check_for_correct_user, only: [:index, :new, :create, :show]

  def index
    @user = User.find params[:user_id]
    @conversations = @user.user_conversations.order("updated_at DESC")
  end

  def show
    @message = Message.new
    @messages = @conversation.messages.order("created_at ASC")

    @conversation.update_attributes(read: true)
  end

  def new
    @user = User.find params[:user_id]
    @conversation = @user.user_conversations.build
    @conversation.build_conversation.messages.build
  end

  def create
    @conversation = UserConversation.new(user_conversation_params)
    @conversation.user = current_user
    @conversation.conversation.messages.first.user = current_user

    respond_to do |format|
      if @conversation.save
        format.html { redirect_to user_conversation_path(current_user, @conversation) }
      else
        format.html { redirect_to :back, alert: "#{@conversation.errors.full_messages.join(", ")}" }
      end
    end
  end

  # def mark_as_read
  #   @conversation = UserConversation.find(params[:id])
  #   @conversation.update_attributes(read: true)

  #   respond_to do |format|
  #     format.html { redirect_to user_conversation_path(current_user, @conversation) }
  #     format.js
  #   end
  # end

  private

  def set_conversation
    @conversation = UserConversation.find params[:id]
  end

  def check_for_correct_user
    redirect_to_back_or_root("Sorry! That is someone elses stuff") unless params[:user_id].to_i == current_user.try(:id)
  end

  def check_for_present_user
    redirect_to_back_or_root("You need to be signed in to send a message") unless current_user.present?
  end

  def user_conversation_params
    params.require(:user_conversation).permit(to: [], conversation_attributes: [:subject, messages_attributes: [:body]])
  end
end
