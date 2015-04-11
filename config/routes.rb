GiAlbum::Engine.routes.draw do
  get '/thumb/:path', to: 'thumb#show', constraints: { path: /.*/ }
  get '/api/photo/index', to: 'photo#index'

#  get '/', to: redirect('ui/show'), as: :redirect_ui
  get '(*path)', to: 'ui#show', as: :ui
end
