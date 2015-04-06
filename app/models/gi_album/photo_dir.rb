module GiAlbum
  class PhotoDir < Element
    HIDDEN_DIRS = [
      /backup/,
      /lib/,
      /misc/,
      /private/,
      /thumb/,
      /trash/,
      /work/,
    ]

    def self.full_folder_icon_path
      @full_folder_icon_path ||= "#{GiAlbum.gem_root_dir}/app/assets/images/gi_album/material/folder.svg"
    end

    def photo?
      false
    end

    def valid?
      p = path.downcase
      HIDDEN_DIRS.none? { |pattern| p =~ pattern }
    end

    def list
      glob = "#{full_path}/*"
      elements = Dir[glob]
        .map do |f|
        elem_path = f[@root_dir.length + 1, f.length]
        create_element(elem_path)
      end.compact

      dirs = elements
        .select { |e| !e.photo? }
        .sort { |a,b| a.name <=> b.name }

      photos = elements
        .select { |e| e.photo? }
        .sort { |a,b| a.name <=> b.name }

      dirs + photos
    end

    def create_element(elem_path)
      elem =
        if File.directory?(full_element_path(elem_path))
          GiAlbum::PhotoDir.new(@root_dir, elem_path)
        else
          GiAlbum::Photo.new(@root_dir, elem_path)
        end
      elem.valid? ? elem : nil
    end

    def create_photo(elem_path)
      GiAlbum::Photo.new(@root_dir, elem_path)
    end

    def read_thumb(size)
      self.class.full_folder_icon_path
    end

    private

    def full_element_path(elem_path)
      "#{@root_dir}/#{elem_path}"
    end
  end
end
