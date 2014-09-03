class InvitationsController < ApplicationController
  def create
    @invitation = Invitation.new(invitation_params)

    respond_to do |format|
      if @invitation.save
        format.js
      else
        format.html { redirect_to :back }
      end
    end
  end

  private

  def invitation_params
    params.require(:invitation).permit(:inviter_id, :game_id, :invited_id)
  end
end
