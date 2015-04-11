//= require angular-smart-table-2.0.1/smart-table
//
//= require_self
//= require_tree ./
"use strict";

import shared from 'ng/module';

angular.module("album", [
  shared.name,
  'smart-table',
])
.config(($stateProvider) => {
  // $urlRouterProvider
  //   .otherwise(function($injector, $location) {
  //     if (Rails.development) {
  //       console.debug("Route Not found: " + $location.absUrl());
  //     }
  //     // NOTE KI allow jumping outside of current routing context
  //     window.location = $location.absUrl();
  //   });

  $stateProvider
    .state(
      'root',
      {
        abstract: true,
        templateUrl: 'templates/root'
      });
})
.run(($state) => {
  $state.go('root.index');
});

import IndexController from './index';
