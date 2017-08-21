$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "gi_album/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "gi_album_engine"
  s.version     = GiAlbum::VERSION
  s.authors     = ["Kari Ikonen"]
  s.email       = ["mr.kari.ikonen@gmail.com"]
  s.homepage    = "https://github.com/kikonen/gi_album_engine"
  s.summary     = "gi_album_engine"
  s.description = "gi_album_engine"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", ">= 5.0"
  s.add_dependency "celluloid", ">= 0.17.0"
  s.add_dependency "rmagick", ">= 2.15.0"
  s.add_dependency "bower_vendor"

  s.add_development_dependency "sqlite3"
end
