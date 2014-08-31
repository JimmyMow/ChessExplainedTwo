class AdDetailsToGame < ActiveRecord::Migration
  def change
    add_column :games, :white_player, :string
    add_column :games, :white_rating, :string
    add_column :games, :black_player, :string
    add_column :games, :black_rating, :string
    add_column :games, :result, :string
    add_column :games, :event, :string
    add_column :games, :opening, :string
  end
end
