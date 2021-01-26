class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.text :image
      t.text :title
      t.text :description
      t.text :tags
      t.text :live
      t.text :github

      t.timestamps
    end
  end
end
