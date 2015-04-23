module GiAlbum
  class UiController < ::BaseController
    layout 'gi_album/engine'

    def show
      @show_navbar = false
      @base_href = GiAlbum::Engine.base_href
    end
  end
end
