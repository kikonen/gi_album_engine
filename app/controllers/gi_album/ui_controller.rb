module GiAlbum
  class UiController < ::BaseController
    layout 'gi_album/engine'

    def show
      @ng_app = true
      @show_navbar = false
      @show_breadcrumb = false
      @base_href = GiAlbum::Engine.base_href
    end
  end
end
