module GiAlbum
  class Engine < ::Rails::Engine
    isolate_namespace GiAlbum

    def self.rails_config
      @rails_config ||= RailsConfig.load_files(File.join(GiAlbum.gem_root_dir, 'config/settings.yml'))
    end
  end
end

class GiAlbum::Engine
  def self.mount_path
    "/#{parent.name.underscore}"
  end
end

class GiAlbum::Engine
  def self.base_href
    "#{mount_path}/"
  end
end
