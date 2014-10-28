class GamesController < ApplicationController
  before_action :set_game, only: [:show, :edit, :update, :destroy, :review]
  before_action :authenticate_user!, only: [:create, :update]
  before_action :check_for_user, only: [:new]
  before_action :check_if_user_or_if_token_present, only: [:review]

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

    @white_rating = @game.white_rating == "?" ? "No rating" : @game.white_rating
    @black_rating = @game.black_rating == "?" ? "No rating" : @game.black_rating



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
    respond_to do |format|
     format.js
    end
  end

  # POST /games
  # POST /games.json
  def create
    @game = Game.new
    @game.creator_id = current_user.id
    @game.create_details(params[:game][:details])

    config_opentok
    @game.sessionId = @opentok.create_session.session_id

    respond_to do |format|
      if @game.save
        @game.create_moves(params[:game][:moves])
        format.html { redirect_to review_game_url(@game), notice: 'Awesome! Everything seems to have gone smoothly. You can share this url with anyone you want to join you.' }
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
        format.js
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
      params.require(:game).permit(:moves, :white_player, :white_rating, :black_player, :black_rating, :result, :event, :opening)
    end

    def check_if_user_or_if_token_present
       unless params[:token] == @game.sessionId || current_user.try(:is_game_owner?,@game)
        redirect_to :back, notice: "You do not have permission to access that game. Ask the user to share their game link with you."
       end
    end
end
