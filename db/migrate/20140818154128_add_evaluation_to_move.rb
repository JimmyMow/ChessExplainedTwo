class AddEvaluationToMove < ActiveRecord::Migration
  def change
    add_column :moves, :eval, :integer
  end
end
