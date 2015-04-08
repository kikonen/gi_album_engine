module GiAlbum
  class ThumbController < ::ApiController
    def show
      elem = album.root.create_element(params[:path])
      thumb = elem.read_thumb(GiAlbum::Photo::DEF_THUMB_SIZE)
      send_file(
        thumb[:full_path],
        type: thumb[:content_type],
        disposition: 'inline')
    end

    def album
      @album ||= GiAlbum::Album.new
    end
  end
end
