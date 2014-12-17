'use strict';
angular.module('angularCmsApp').controller('RegisterCtrl', function($scope, $log, cmsAuthService) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  $scope.user = {
    username: null,
    email: null,
    password: null,
    role: 'member',
    created: new Date(),
    modified: new Date(),
    metadata: {
      avatar: '',
      name: null,
      about: null
    }
  };
  return $scope.register = function(user) {
    $log.info('register', user);
    return cmsAuthService.register(user);
  };
});
