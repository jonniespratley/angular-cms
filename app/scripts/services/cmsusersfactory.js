
/**
@ngdoc service
@name angularCmsApp.service:cmsUsersFactory
@function
 
@description
 This is the UsersFactory.
 */
'use strict';
angular.module('angularCmsApp').factory('cmsUsersFactory', function() {
  var meaningOfLife;
  meaningOfLife = 42;
  return {
    someMethod: function() {
      return meaningOfLife;
    }
  };
});
