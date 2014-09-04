class AddColumnsToInvitation < ActiveRecord::Migration
  def change
    add_column :invitations, :scheduled_at, :datetime
    add_column :invitations, :accepted, :boolean
  end
end
