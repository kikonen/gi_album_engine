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
  $stateProvider
    .state(
      'root',
      {
        abstract: true,
        templateUrl: 'gi_album/album/root'
      });
});

import IndexController from './index';
