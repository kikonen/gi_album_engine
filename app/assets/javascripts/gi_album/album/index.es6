"use strict";

const BASE_URL = '';

class IndexController {
  constructor($scope, $http, $location, Breadcrumb) {
    var vm = this;
    vm.$location = $location;
    vm.$http = $http;
    vm.Breadcrumb = Breadcrumb;
    vm.thumb = null;

    vm.rows = 20;

    vm.dir = null;
    vm.elements = [];
    vm.firstPhotoIndex = 0;

    vm.photo = null;
    vm.photoIndex = null;

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
        this.firstPhotoIndex = _.findIndex(this.elements, {photo: true});
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
      this.photoIndex = null;
    } else {
      this.photo = photo;
      this.photoIndex = _.indexOf(this.elements, photo);
    }
    if (event) {
      event.stopPropagation();
    }
  }

  nextPhoto(dir) {
    if (this.photo) {
      let index = this.photoIndex + dir;
      if (index < this.firstPhotoIndex) {
        index = this.firstPhotoIndex;
      }
      if (index >= this.elements.length) {
        index = this.elements.length - 1;
      }
      let photo = this.elements[index];
      if (photo !== this.photo) {
        this.setPhoto(photo, null);
        this.thumb.showPageByIndex(index);
      }
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

  getRandomRotate(photo) {
    if (!photo.rotate) {
      photo.rotate =  2 - Math.random() * 4;
    }
    return photo.rotate;
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
    if (event.keyCode === 27) {
      // escape
      this.setPhoto(null, event);
    } else if (event.keyCode === 39) {
      // right
      if (this.photo) {
        this.nextPhoto(1);
      } else {
        this.onSwipeLeft();
      }
    } else if (event.keyCode === 37) {
      // left
      if (this.photo) {
        this.nextPhoto(-1);
      } else {
        this.onSwipeRight();
      }
    } else {
      console.log("key = " + event.keyCode);
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

      scope.showPageByIndex = (index) => {
        let page = (index / scope.stItemsByPage) << 0,
            start = page * scope.stItemsByPage;
        if (page !== paginationState.start) {
          ctrl.slice(start, scope.stItemsByPage);
        }
      };

      scope.onSwipeLeft = () => {
        ctrl.slice(paginationState.start + scope.stItemsByPage, scope.stItemsByPage);
      };

      scope.onSwipeRight = () => {
        var start = paginationState.start - scope.stItemsByPage;
        if (start < 0) {
          start = 0;
        }
        ctrl.slice(start, scope.stItemsByPage);
      };
    }
  };
})
.directive('previewImg', function() {
  return {
    scope: {
      previewImg: '@'
    },
    link: (scope, element) => {
      scope.$watch('previewImg', () => {
        let url = scope.previewImg.replace(/ /g, '%20');
        element.css({
          'background-image': 'url(' + url + ')'
        });
      });
    }
  };
});
