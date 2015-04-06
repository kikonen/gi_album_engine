module GiAlbum
  class UiController < ::BaseController
    layout 'gi_album/engine'

    def index
      @base_href = GiAlbum::Engine.base_href
    end
  end
end
