module GiAlbum
  class UiController < ::BaseController
    layout 'gi_album/engine'

    def index
      @base_href = "#{GiAlbum::Engine.mount_path}/"
    end
  end
end
