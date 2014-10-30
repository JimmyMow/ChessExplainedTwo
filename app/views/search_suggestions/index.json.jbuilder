json.array!(@search_suggestions) do |search_suggestion|
  json.set! :label, search_suggestion.handle
  json.set! :value, search_suggestion.handle
  json.set! :id, search_suggestion.id
end
