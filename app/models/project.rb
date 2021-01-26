class Project < ApplicationRecord
  validates :title, presence: true
  validates :title, presence: true
  validates :description, presence: true
  validates :tags, presence: true
  validates :live, presence: true
  validates :github, presence: true
end
