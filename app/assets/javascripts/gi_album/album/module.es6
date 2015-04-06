//= require angular-smart-table-2.0.1/smart-table
//
//= require_self
//= require_tree ./
"use strict";

import shared from 'ng/module';

angular.module("album", [
  shared.name,
  'smart-table',
]);

import index from './index';
