class PagesController < ApplicationController
  def home
    @jack_mallers = User.find_by(email: "jimmymowschess@gmail.com") unless user_signed_in?
  end
end
