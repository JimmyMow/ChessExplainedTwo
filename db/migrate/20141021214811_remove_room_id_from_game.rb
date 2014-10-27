class RemoveRoomIdFromGame < ActiveRecord::Migration
  def change
    remove_column :games, :room_id
  end
end
