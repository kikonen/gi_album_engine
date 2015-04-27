//= require angular-touch-1.3.15/angular-touch
//= require angular-smart-table-2.0.1/smart-table
//
//= require_self
//= require_tree ./
"use strict";

import shared from 'ng/module';

angular.module("album", [
  shared.name,
  'smart-table',
  'ngTouch',
])
.config(($stateProvider) => {
  $stateProvider
    .state(
      'root',
      {
        abstract: true,
        templateUrl: 'gi_album/album/root'
      });
});

import {} from './index';
