class PagesController < ApplicationController
  def home
    @jack_mallers = User.find_by(email: "jimmymowschess@gmail.com")
  end

  def announcement

  end
end
