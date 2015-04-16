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

    $scope.$watch(() => $location.url(), () => vm.updateDir());
    $scope.$watch(() => vm.dir , () => vm.updateLocation());
    vm.updateDir();
  }

  loadIndex() {
    console.debug("loading... " + this.dir);

    this.$http
      .get('api/photo/index', { params: { dir: this.dir } })
      .then((resp) => {
        this.elements = resp.data;
        console.debug("count: " + this.elements.length);
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
              name: 'Home',
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
    this.Breadcrumb.setPath(path);
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
});
