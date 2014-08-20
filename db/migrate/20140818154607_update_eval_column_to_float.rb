class UpdateEvalColumnToFloat < ActiveRecord::Migration
  def change
    change_column :moves, :eval,  :float
  end
end
