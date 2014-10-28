class UsersController < ApplicationController
  before_action :set_user, only: [:show]

  def index

  end

  def show
    @games = @user.games.order("created_at DESC").limit(10)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
