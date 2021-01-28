class StaticPagesController < ApplicationController
  def index
    
  end

  def projects
    @projects = Project.all
  end
end
