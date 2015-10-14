class AddImageUrlToSports < ActiveRecord::Migration
  def change
 		add_column :sports, :image_url, :string
  end
end
