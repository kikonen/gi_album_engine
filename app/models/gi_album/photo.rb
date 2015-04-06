require 'rmagick'

module GiAlbum
  class Photo < Element
    DEF_THUMB_SIZE = 64

    def photo?
      true
    end

    def valid?
      @valid ||=
        begin
          f = path.downcase
          (f =~ /.jpg$/ || f =~ /\.png$/) != nil
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

    def read_thumb(size)
      create_thumb(size)
#      open(full_thumb_path(size), "rb").read
      full_thumb_path(size)
    end

    def create_thumb(size)
      target_path = full_thumb_path(size)
      return if File.exists?(target_path)

      logger.info "starting: #{full_path} => #{target_path}"
      image = Magick::Image.read(full_path).first
      thumb = image.resize_to_fit(size, size)

      FileUtils.mkdir_p(File.dirname(target_path))
      thumb.write(target_path)

      logger.info "done: #{target_path}"
    end
  end
end
