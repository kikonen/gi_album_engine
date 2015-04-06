json.name element.name
json.photo element.photo?
json.path element.path

if element.photo?
  json.thumb_path element.thumb_path GiAlbum::Photo::DEF_THUMB_SIZE
  json.width 100
  json.height 100
end
