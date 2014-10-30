Rails.application.routes.draw do
  # Autocomplete user message route
  get "/search_suggestions" => "search_suggestions#index", as: :search_suggestions
  # Manually uploading games route
  get "/games/manual_upload" => "games#manual", as: :manual_upload

  resources :games, except: [:index] do
    member { get :review }
  end

  devise_for :users, controllers: { sessions: "sessions", registrations: "registrations" }
  resources :users, only: [:index, :show] do
    resources :conversations, :controller => "user_conversations"
  end

  resource :analysis, only: [:create]
  root to: "pages#home"

  resource :variations, only: [:create]

  resources :invitations, only: [:create, :show]

  # resources :conversations, :controller => "user_conversations" do
  #   resources :messages
  #   member do
  #     post :mark_as_read
  #     post :mark_as_unread
  #   end
  # end



  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
