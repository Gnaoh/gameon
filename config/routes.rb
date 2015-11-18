Rails.application.routes.draw do
 
  root to: "sites#index"

  get '/sessions/new', to: 'sessions#new'

  post '/sessions', to: 'sessions#create'

  delete '/sessions', to: "sessions#destroy"
  
  get '/events', to: "events#index", as: "events"

  get '/events/:id', to: 'events#show', as: "event"

  get '/events/:id/edit', to: 'events#edit', as: "edit_event"

  post "/events", to: "events#create"

  patch "/users/edit/:event_id", to: "attendings#edit", as: "remove_attending"

  #the update route 
  patch "/events/:id", to: "events#update"

  patch "/users/:id", to: "users#update"

  #the destroy route 
  delete "/events/:id", to: "events#destroy"

  get "/cities/:id/events/new", to: "events#new", as: "city_event_new"

  post '/cities/:id/events/new', to: 'events#create'

  post "/events/:event_id", to: "attendings#create", as: "attendings"

  # post to events

  # deleting user from event

  resources :users
  resources :cities do
    resources :events
  end

end

# Prefix Verb   URI Pattern                                Controller#Action
#             root GET    /                                          sites#index
#     sessions_new GET    /sessions/new(.:format)                    sessions#new
#         sessions POST   /sessions(.:format)                        sessions#create
#                  DELETE /sessions(.:format)                        sessions#destroy
#           events GET    /events(.:format)                          events#index
#            event GET    /events/:id(.:format)                      events#show
#       edit_event GET    /events/:id/edit(.:format)                 events#edit
#                  POST   /events(.:format)                          events#create
# remove_attending PATCH  /users/edit/:event_id(.:format)            attendings#edit
#                  PATCH  /events/:id(.:format)                      events#update
#                  PATCH  /users/:id(.:format)                       users#update
#                  DELETE /events/:id(.:format)                      events#destroy
#   city_event_new GET    /cities/:id/events/new(.:format)           events#new
#                  POST   /cities/:id/events/new(.:format)           events#create
#       attendings POST   /events/:event_id(.:format)                attendings#create
#            users GET    /users(.:format)                           users#index
#                  POST   /users(.:format)                           users#create
#         new_user GET    /users/new(.:format)                       users#new
#        edit_user GET    /users/:id/edit(.:format)                  users#edit
#             user GET    /users/:id(.:format)                       users#show
#                  PATCH  /users/:id(.:format)                       users#update
#                  PUT    /users/:id(.:format)                       users#update
#                  DELETE /users/:id(.:format)                       users#destroy
#      city_events GET    /cities/:city_id/events(.:format)          events#index
#                  POST   /cities/:city_id/events(.:format)          events#create
#   new_city_event GET    /cities/:city_id/events/new(.:format)      events#new
#  edit_city_event GET    /cities/:city_id/events/:id/edit(.:format) events#edit
#       city_event GET    /cities/:city_id/events/:id(.:format)      events#show
#                  PATCH  /cities/:city_id/events/:id(.:format)      events#update
#                  PUT    /cities/:city_id/events/:id(.:format)      events#update
#                  DELETE /cities/:city_id/events/:id(.:format)      events#destroy
#           cities GET    /cities(.:format)                          cities#index
#                  POST   /cities(.:format)                          cities#create
#         new_city GET    /cities/new(.:format)                      cities#new
#        edit_city GET    /cities/:id/edit(.:format)                 cities#edit
#             city GET    /cities/:id(.:format)                      cities#show
#                  PATCH  /cities/:id(.:format)                      cities#update
#                  PUT    /cities/:id(.:format)                      cities#update
#                  DELETE /cities/:id(.:format)                      cities#destroy

