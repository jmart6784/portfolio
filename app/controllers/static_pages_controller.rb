class StaticPagesController < ApplicationController
  def index
    @projects = [
      Project.find_by(title: "Instagram clone"),
      Project.find_by(title: "Odin Book"),
      Project.find_by(title: "Where's Waldo?"),
      Project.find_by(title: "Shopping Cart"),
      Project.find_by(title: "Battleship"),
      Project.find_by(title: "Memory Card"),
      Project.find_by(title: "Odin Weather"),
      Project.find_by(title: "Flickr Feed"),
      Project.find_by(title: "Odin Kittens"),
      Project.find_by(title: "Odin Library"),
      Project.find_by(title: "Tic Tac Toe"),
      Project.find_by(title: "CSS grid Framework")
    ]
  end

  def projects
    @projects = Project.all
  end
end
