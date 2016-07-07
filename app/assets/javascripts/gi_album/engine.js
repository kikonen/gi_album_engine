// This is a manifest file that'll be compiled into engine.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//=require_self
jQuery(function() {
  "use strict";
  gi.initModule('gi_album/album/module');
  // NOTE KI not using @ng_app due to dependency order cycle in es6 module logic
  // => need to tune logic to avoid this
  angular.bootstrap(document, ['album'], { strictDi: Rails.strictId });
});
