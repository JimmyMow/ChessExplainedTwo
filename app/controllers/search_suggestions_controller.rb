class SearchSuggestionsController < ApplicationController
  def index
    @search_suggestions = User.terms_for(params[:term])
    render template: "search_suggestions/index.json.jbuilder"
  end
end
