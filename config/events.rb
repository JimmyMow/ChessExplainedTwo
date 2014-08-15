WebsocketRails::EventMap.describe do
  namespace :board do
    subscribe :position_board, :to => WebsocketGamesController, :with_method => :position_board

    subscribe :trigger_variation, :to => WebsocketGamesController, :with_method => :trigger_variation

    subscribe :start, :to => WebsocketGamesController, :with_method => :start
    subscribe :clear, :to => WebsocketGamesController, :with_method => :clear
  end
  # You can use this file to map incoming events to controller actions.
  # One event can be mapped to any number of controller actions. The
  # actions will be executed in the order they were subscribed.
  #
  # Uncomment and edit the next line to handle the client connected event:
  #   subscribe :client_connected, :to => Controller, :with_method => :method_name
  #
  # Here is an example of mapping namespaced events:
  #   namespace :product do
  #     subscribe :new, :to => ProductController, :with_method => :new_product
  #   end
  # The above will handle an event triggered on the client like `product.new`.
end
