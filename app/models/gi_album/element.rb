module GiAlbum
  class Element
    attr_reader :root_dir, :path

    def initialize(root_dir, path)
      @root_dir = root_dir
      @path = path || ''
    end

    def name
      @name ||= File.basename(@path)
    end

    def full_path
      @full_path ||= @path.empty? ? "#{@root_dir}" : "#{@root_dir}/#{@path}"
    end

    def base_path
      @base_path ||= @path[0..-(file_ext.length + 1)]
    end

    def file_ext
      @file_ext ||= File.extname(@path)
    end
  end
end
