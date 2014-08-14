class AddVidChatColumnsToGame < ActiveRecord::Migration
  def change
    add_column :games, :sessionId, :string
    add_column :games, :public, :boolean
  end
end
