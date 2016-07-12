//= require angular-touch-1.3.15/angular-touch
//= require angular-smart-table-2.0.1/smart-table
//
//= require_self
//= require_tree ./
"use strict";

import * as base from 'ng/module';
import * as index from './index';

export function init() {
  base.init();

  angular.module("album", [
    'base',
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

  index.init();
  gi.initNg('album');
}
