class UserNotification < ActionMailer::Base
  # default from: "jack@chessexplainedapp.com"
  default from: "jimmymowschess@gmail.com"

  def invitation(invitation, email_address)
    @inviter_user = email_address
    @invited_user = invitation.invited
    @game = invitation.game
    @time = invitation.scheduled_at
    @invitation = invitation

    mail(to: @invited_user.email, subject: "You've been invited to review chess on ChessExplained!")
  end
end
