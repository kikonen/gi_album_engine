module GiAlbum
  class ThumbController < ::ApiController
    def show
      elem = album.root.create_element(params[:path])
      full_thumb_path = elem.read_thumb(GiAlbum::Photo::DEF_THUMB_SIZE)
      send_file(
        full_thumb_path,
        type: 'image/svg',
        disposition: 'inline')
    end

    def album
      @album ||= GiAlbum::Album.new
    end
  end
end
