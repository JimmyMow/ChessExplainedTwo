class MessagesController < ApplicationController

  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id

    respond_to do |format|
      if @message.save
        format.html { redirect_to user_conversation_url(user_id: current_user.id, id: params[:user_conversation_id]) }
      else
        format.html { redirect_to :back, alert: @message.errors.full_messages.first }
      end
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :conversation_id)
  end
end
