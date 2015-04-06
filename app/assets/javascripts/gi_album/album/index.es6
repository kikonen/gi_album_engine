"use strict";

class IndexController {
  constructor($scope, $http, $location) {
    var vm = this;
    vm.$location = $location;
    vm.dir = '';
    vm.elements = [];

    function loadIndex() {
      console.log("loading...");
      vm.dir = $location.url();
      $http
        .get('api/photo/index', { params: { dir: vm.dir } })
        .then((resp) => {
          console.log(resp.data);
          vm.elements = resp.data;
        });
    }

    $scope.$watch(() => $location.url(), loadIndex);
  }

  changeDir(path) {
    console.log(path);
    this.$location.url(path);
    this.dir = path;
  }
}

export default angular.module('album')
.controller('IndexController', IndexController);
