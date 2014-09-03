class CreateInvitations < ActiveRecord::Migration
  def change
    create_table :invitations do |t|
      t.integer :inviter_id
      t.integer :invited_id
      t.integer :game_id

      t.timestamps
    end
  end
end
