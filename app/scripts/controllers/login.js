'use strict';

/**
Login Controller - Handles the login.html view for authenticating a user.
 */
angular.module('angularCmsApp').controller('LoginCtrl', function($scope, $rootScope, $cookieStore, cmsAuthService, cmsNotify, cmsSessionService) {
  $scope.user = {
    email: null,
    password: null,
    remember: false
  };
  /**
  		login - This functionality should be moved into the session service that handles
  		setting the session and changing the location of the page.
   */
  $scope.login = function(u) {
    return cmsAuthService.login(u);
  };
  $scope.logout = function(user) {
    return cmsAuthService.logout(user);
  };
  $scope.name = 'login';
});
