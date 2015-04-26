"use strict";

const BASE_URL = '';

class IndexController {
  constructor($scope, $http, $location, Breadcrumb) {
    var vm = this;
    vm.$location = $location;
    vm.$http = $http;
    vm.Breadcrumb = Breadcrumb;
    vm.dir = null;
    vm.elements = [];
    vm.photo = null;
    vm.rows = 20;
    vm.thumb = null;

    $scope.$watch(() => $location.url(), () => vm.updateDir());
    $scope.$watch(() => vm.dir , () => vm.updateLocation());
    vm.updateDir();
  }

  loadIndex() {
    console.debug("loading... " + this.dir);

    this.$http
      .get('api/photo/index', { params: { dir: this.dir } })
      .then((resp) => {
        this.photo = null;
        this.elements = resp.data;
        console.debug("count: " + this.elements.length);

        // TODO KI ugly hack to keep focus in desired place for keyboard actions
        document.getElementById("tableContainer").focus();
      });
  }

  goUp(path) {
    var parts = _.chain(path.split('/')).compact().initial(),
        parentPath = parts.join('/');
    console.debug(parts);
    console.debug(parentPath);

    this.$location.url(BASE_URL + parentPath);
  }

  goDir(path) {
    this.$location.url(BASE_URL + path);
  }

  setPhoto(photo, event) {
    if (this.photo == photo) {
      this.photo = null;
    } else {
      this.photo = photo;
    }
    if (event) {
      event.stopPropagation();
    }
  }


  updateLocation() {
    this.goDir(this.dir);
    this.loadIndex();
  }

  // Update current dir based into current url
  updateDir() {
    let url = decodeURIComponent(this.$location.url());
    console.debug("url: " + url);
    let dir = url.slice(BASE_URL.length, url.length);
    if (dir === '/') {
      dir = '';
    }
    if (dir !== this.dir) {
      this.dir = dir;
      this.updateCrumbs();
    }
  }

  // Show current album path as breadcrumbs
  updateCrumbs() {
    console.debug(this.dir);
    let elements = this.dir.split('/'),
        pathPrefix = '/gi_album',
        path = _.map(elements, (elem) => {
          if (elem === '') {
            return {
              name: 'Album',
              url: '/gi_album'
            };
          } else {
            let prefix = pathPrefix;
            pathPrefix = pathPrefix + '/' + elem;
            return {
              name: elem,
              url: prefix + '/' + elem
            };
          }
        });
    path.unshift({
      name: 'Home',
      url: '/'
    });
    this.Breadcrumb.setPath(path);
  }

  onKeydown(event) {
    console.log("key = " + event.keyCode);
    if (event.keyCode === 27) {
      // escape
      this.setPhoto(null);
    } else if (event.keyCode === 39) {
      // right
      this.onSwipeLeft();
    } else if (event.keyCode === 37) {
      // left
      this.onSwipeRight();
    }
  }

  onSwipeLeft() {
    this.thumb.onSwipeLeft();
  }

  onSwipeRight() {
    this.thumb.onSwipeRight();
  }
}

angular.module('album')
.controller('IndexController', IndexController)
.config(($stateProvider) => {
  $stateProvider
    .state(
      'root.index',
      {
        url: '/{path:.*}',
        templateUrl: 'gi_album/album/index',
        controller: IndexController,
        controllerAs: 'index'
      });
})
.directive('giThumb', function () {
  return {
    restrict: 'A',
    require: '^stTable',
    scope: {
      stItemsByPage: '=?'
    },
    link: function (scope, element, attrs, ctrl) {
      scope.$parent.index.thumb = scope;

      var paginationState = ctrl.tableState().pagination;

      scope.onSwipeLeft = function() {
        ctrl.slice(paginationState.start + scope.stItemsByPage, scope.stItemsByPage);
      };

      scope.onSwipeRight = function() {
        var start = paginationState.start - scope.stItemsByPage;
        if (start < 0) {
          start = 0;
        }
        ctrl.slice(start, scope.stItemsByPage);
      };
    }
  };
});
