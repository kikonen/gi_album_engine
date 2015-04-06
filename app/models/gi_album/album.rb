module GiAlbum
  class Album
    attr_reader :root_dir

    def initialize
      @root_dir = GiAlbum.config.album.root_dir
      unless File.exists?(thumb_dir)
        FileUtils.mkdir_p(thumb_dir)
      end
    end

    def root
      @root::PhotoDir.new(self, '')
    end

    def list(photo_dir_path)
      dir = GiAlbum::PhotoDir.new(self, photo_dir_path)
      dir.list
    end

    def logger
      Rails.logger
    end

    def thumb_dir
      @thumb_dir ||= "#{Rails.root}/tmp/thumbnail"
    end
  end
end
