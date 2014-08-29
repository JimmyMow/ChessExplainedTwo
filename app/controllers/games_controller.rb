class GamesController < ApplicationController
  before_action :set_game, only: [:show, :edit, :update, :destroy, :review]
  before_action :authenticate_user!, only: [:create]
  before_action :check_for_user, only: [:new]

  # GET /games
  # GET /games.json
  def index
    @games = Game.all
  end

  # GET /games/1
  # GET /games/1.json
  def show
  end

  def review
    config_opentok
    @tok_token = @opentok.generate_token @game.sessionId
    @variation = Variation.new


    if params[:change_coach_mode]
      params[:coach_mode] ? @game.coach_mode = true : @game.coach_mode = false
      @game.save
    end

    if @game.coach_mode
      @coachModeStatus = "on"
    else
      @coachModeStatus = "off"
    end
  end

  def manual
    @game = Game.new
  end

  # GET /games/new
  def new
    @game = Game.new
  end

  # GET /games/1/edit
  def edit
  end

  # POST /games
  # POST /games.json
  def create
    @game = Game.new
    @game.creator_id = current_user.id

    config_opentok
    @game.sessionId = @opentok.create_session.session_id

    respond_to do |format|
      if @game.save
        @game.create_moves(params[:game][:moves])
        format.html { redirect_to review_game_url(@game), notice: 'Awesome! Your game was created. Now share this url with anyone you want to join your game room.' }
        format.json { render :show, status: :created, location: @game }
      else
        format.html { render :new }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /games/1
  # PATCH/PUT /games/1.json
  def update
    respond_to do |format|
      if @game.update(game_params)
        format.html { redirect_to @game, notice: 'Game was successfully updated.' }
        format.json { render :show, status: :ok, location: @game }
      else
        format.html { render :edit }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1
  # DELETE /games/1.json
  def destroy
    @game.destroy
    respond_to do |format|
      format.html { redirect_to games_url, notice: 'Game was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Opentok Configuration
    def config_opentok
      if @opentok.nil?
        @opentok = OpenTok::OpenTok.new 44827272, 'fb27ffafec7f84cfcd2da58bcf6b3565b204b6d0'
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    def check_for_user
      unless user_signed_in?
        flash.now[:notice] = "You need to be signed in to upload a game. Click <a href=\"/users/sign_in\">here</a> to sign in.".html_safe
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def game_params
      params.require(:game).permit(:moves)
    end
end
