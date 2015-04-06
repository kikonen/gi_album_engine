require 'rmagick'

module GiAlbum
  class Photo < Element
    DEF_THUMB_SIZE = 64

    VALID_TYPES = [
      # images
      /\.gif$/,
      /\.jpg$/,
      /\.jpeg$/,
      /\.png$/,
      # movies
      /\.avi$/,
      /\.mp4$/,
      /\.mov$/,
    ]

    def photo?
      true
    end

    def valid?
      @valid ||=
        begin
          p = file_ext.downcase
          super && VALID_TYPES.any? { |pattern| p =~ pattern }
        end
    end

    def thumb_path(size)
      @thumb_path ||= {}
      @thumb_path[size] ||= "thumbnail/#{base_path}-thumb-#{size}#{file_ext}"
    end

    def full_thumb_path(size)
      @full_thumb_path ||= {}
      @full_thumb_path[size] ||= "#{root_dir}/#{thumb_path(size)}"
    end

    def image
      @image ||= Magick::Image.read(full_path).first
    end

    #
    # @return full path to thumb
    #
    def read_thumb(size)
      create_thumb(size)
      full_thumb_path(size)
    end

    def create_thumb(size)
      target_path = full_thumb_path(size)
      return if File.exists?(target_path)

      logger.info "creating thumb: #{full_path} => #{target_path}"

      # TODO KI instead of resize, should use existing thumb data from file (EXIF)
      # if such exists
      thumb = image.resize_to_fit(size, size)

      FileUtils.mkdir_p(File.dirname(target_path))
      thumb.write(target_path)

      logger.info "created thumb: #{target_path}"
    end
  end
end
