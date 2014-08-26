class SandboxesController < ApplicationController
  before_action :set_sandbox, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:create]

  # GET /sandboxes
  # GET /sandboxes.json
  def index
    @sandboxes = Sandbox.all
  end

  # GET /sandboxes/1
  # GET /sandboxes/1.json
  def show
  end

  # GET /sandboxes/new
  def new
    @sandbox = Sandbox.new
  end

  # GET /sandboxes/1/edit
  def edit
  end

  # POST /sandboxes
  # POST /sandboxes.json
  def create
    @sandbox = Sandbox.new
    @sandbox.creator_id = current_user.id

    config_opentok
    @sandbox.sessionId = @opentok.create_session.session_id

    respond_to do |format|
      if @sandbox.save
        format.html { redirect_to @sandbox, notice: 'Sandbox was successfully created.' }
        format.json { render :show, status: :created, location: @sandbox }
      else
        format.html { render :new }
        format.json { render json: @sandbox.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sandboxes/1
  # PATCH/PUT /sandboxes/1.json
  def update
    respond_to do |format|
      if @sandbox.update(sandbox_params)
        format.html { redirect_to @sandbox, notice: 'Sandbox was successfully updated.' }
        format.json { render :show, status: :ok, location: @sandbox }
      else
        format.html { render :edit }
        format.json { render json: @sandbox.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sandboxes/1
  # DELETE /sandboxes/1.json
  def destroy
    @sandbox.destroy
    respond_to do |format|
      format.html { redirect_to sandboxes_url, notice: 'Sandbox was successfully destroyed.' }
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
    def set_sandbox
      @sandbox = Sandbox.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sandbox_params
      params.require(:sandbox).permit()
    end
end
