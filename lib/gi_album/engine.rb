module GiAlbum
  class Engine < ::Rails::Engine
    isolate_namespace GiAlbum
  end
end

class GiAlbum::Engine
  def self.mount_path
    "#{parent.name.underscore}"
  end
end
