Rails.application.routes.draw do
  root to: "static_pages#index"
  get "/projects", to: "static_pages#projects"
end
