module GiAlbum
  class Album
    attr_reader :root_dir

    def initialize
      @root_dir = GiAlbum.config.album.root_dir
    end

    def root
      @root::PhotoDir.new(@root_dir, '')
    end

    def list(photo_dir_path)
      dir = GiAlbum::PhotoDir.new(@root_dir, photo_dir_path)
      dir.list
    end

    def logger
      Rails.logger
    end
  end
end
