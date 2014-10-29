class UsersController < ApplicationController
  before_action :set_user, only: [:show]

  def index

  end

  def show
    @games = @user.games.order("created_at DESC").paginate(page: params[:page], per_page: 5)

    respond_to do |format|
      format.html
      format.js
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
