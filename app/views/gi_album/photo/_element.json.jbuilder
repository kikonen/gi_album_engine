name = element.name
name = name[0, name.index('.') || name.length].humanize

json.name element.name
json.display_name name
json.photo element.photo?
json.path element.path

if element.photo?
  json.thumb_path element.thumb_path GiAlbum::Photo::DEF_THUMB_SIZE
  json.width 100
  json.height 100
  json.image_info element.image_info
end
