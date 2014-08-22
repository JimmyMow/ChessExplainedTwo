json.array!(@game.moves) do |move|
  json.extract! move, :id, :notation, :fen
  json.variations move.variations do |variation|

    json.moves variation.variation_moves, :id, :notation, :fen
  end
end
