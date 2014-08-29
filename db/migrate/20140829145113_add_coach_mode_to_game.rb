class AddCoachModeToGame < ActiveRecord::Migration
  def change
    add_column :games, :coach_mode, :boolean, default: false
  end
end
