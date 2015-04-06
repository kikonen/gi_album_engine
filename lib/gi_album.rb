require 'rails_config'
require "gi_album/engine"

module GiAlbum
end

module GiAlbum
  def self.gem_root_dir
    File.expand_path('../..', __FILE__)
  end
end

module GiAlbum
  def self.config
    @config ||= RailsConfig.load_files(RailsConfig.setting_files("#{self.gem_root_dir}/config", Rails.env))
  end
end
