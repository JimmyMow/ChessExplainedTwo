class CreateMoves < ActiveRecord::Migration
  def change
    create_table :moves do |t|
      t.integer :game_id
      t.string :notation
      t.string :fen

      t.timestamps
    end
  end
end
