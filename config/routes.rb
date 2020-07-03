Rails.application.routes.draw do
  resources :cars
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root to: 'cars#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
