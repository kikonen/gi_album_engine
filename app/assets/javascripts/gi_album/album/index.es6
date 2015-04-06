"use strict";

class IndexController {
  constructor($scope, $http, $location) {
    var vm = this;
    vm.$location = $location;
    vm.$http = $http;
    vm.dir = null;
    vm.elements = [];

    $scope.$watch(() => $location.url(), () => vm.updateDir());
    $scope.$watch(() => vm.dir , () => vm.updateLocation());
    vm.updateDir();
  }

  loadIndex() {
    console.log("loading..." + this.dir);

    this.$http
      .get('api/photo/index', { params: { dir: this.dir } })
      .then((resp) => {
        this.elements = resp.data;
        console.log("count: " + this.elements.length);
      });
  }

  goUp(path) {
    var parts = _.chain(path.split('/')).compact().initial(),
        parentPath = parts.join('/');
    console.log(parts);
    console.log(parentPath);

    this.$location.url('/ui/' + parentPath);
  }

  goDir(path) {
    this.$location.url('/ui/' + path);
  }

  updateLocation() {
    this.goDir(this.dir);
    this.loadIndex();
  }

  updateDir() {
    var dir = this.$location.url();
    dir = dir.slice(4, dir.length);
    if (dir !== this.dir) {
      this.dir = dir;
    }
  }
}

export default angular.module('album')
.controller('IndexController', IndexController);
