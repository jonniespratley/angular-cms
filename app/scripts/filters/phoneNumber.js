'use strict';

angular.module('ameAngularApp')
  .filter('phoneNumber', function () {
    return function (input) {
      return 'phoneNumber filter: ' + input;
    };
  });
