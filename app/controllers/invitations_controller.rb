class InvitationsController < ApplicationController
  def create
    @invitation = Invitation.new(invitation_params)

    respond_to do |format|
      if @invitation.save
        email_address = @invitation.inviter || params[:invitation][:inviter]
        # UserNotification.delay.invitation(@invitation, email_address)
        UserNotification.invitation(@invitation, email_address).deliver
        format.js
      else
        format.html { redirect_to :back }
      end
    end
  end

  def show
    @invitation = Invitation.find(params[:id])
  end

  private

  def invitation_params
    params.require(:invitation).permit(:inviter_id, :game_id, :invited_id, :scheduled_at, :accepted)
  end
end
