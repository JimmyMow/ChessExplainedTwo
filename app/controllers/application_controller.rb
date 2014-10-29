class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :resource
  helper_method :redirect_to_back_or_root
  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_filter :after_sign_in_path_for
  after_filter :store_location

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << [:handle, :email, :name]
    # devise_parameter_sanitizer.for(:sign_in) << :location
  end

  def store_location
    # store last url - this is needed for post-login redirect to whatever the user last visited.
    return unless request.get?
      if (request.path != "/users/sign_in" &&
        request.path != "/users/sign_up" &&
        request.path != "/users/password/new" &&
        request.path != "/users/password/edit" &&
        request.path != "/users/confirmation" &&
        request.path != "/users/sign_out" &&
        !request.xhr?) # don't store ajax calls
      session[:previous_url] = request.fullpath
    end
  end

  def after_sign_in_path_for(resource=nil)
    session[:previous_url] || root_path
  end

  def resource
    @resource ||= User.new
  end

  def redirect_to_back_or_root(alert)
    if request.env["HTTP_REFERER"].present? and request.env["HTTP_REFERER"] != request.env["REQUEST_URI"]
      flash[:alert] = alert
      redirect_to :back
    else
      flash[:alert] = alert
      redirect_to root_url
    end
  end

end
