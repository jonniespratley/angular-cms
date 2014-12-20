'use strict';
angular.module('angularCmsApp').factory('cmsDataServiceFactory', function() {
  var meaningOfLife;
  meaningOfLife = 42;
  return {
    someMethod: function() {
      return meaningOfLife;
    }
  };
});
