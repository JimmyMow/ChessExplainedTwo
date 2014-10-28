class AddPgnToGame < ActiveRecord::Migration
  def change
    add_column :games, :pgn, :text
  end
end
