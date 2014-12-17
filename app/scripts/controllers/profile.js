'use strict';
angular.module('angularCmsApp').controller('ProfileCtrl', function($scope, $rootScope, DataService, cmsNotify) {
  $scope.user = $rootScope.App.session.user;
  return $scope.update = function(u) {
    return DataService.save('users', u).then(function(data) {
      return cmsNotify('.profile-message', 'success', 'Success!', "Your account was successfully updated.");
    });
  };
});
