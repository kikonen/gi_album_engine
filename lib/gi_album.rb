require 'rails_config'
require "gi_album/engine"

module GiAlbum
end

module GiAlbum
  def self.gem_root_dir
    File.expand_path('../..', __FILE__)
  end
end
