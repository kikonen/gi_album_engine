module GiAlbum
  class PhotoController < ::ApiController
    def index
      album_path = URI.unescape(params[:dir])
      elements = album.list(album_path)

      render :json, partial: "gi_album/photo/index.json", locals: { elements: elements }
    end

    def album
      @album ||= GiAlbum::Album.new
    end
  end
end
