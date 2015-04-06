GiAlbum::Engine.routes.draw do
#  root 'ui#index'

  get '/', to: redirect('ui')
  get '/ui', to: 'ui#index'
  get '/ui/:path', to: 'ui#index', constraints: { path: /.*/ }

  get '/thumb/:path', to: 'thumb#show', constraints: { path: /.*/ }
  get '/api/photo/index', to: 'photo#index'
end
