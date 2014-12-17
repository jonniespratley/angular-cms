'use strict';
angular.module('angularCmsApp').controller('SidebarCtrl', function($scope, $rootScope) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  $scope.items = $rootScope.App.menu.user;
  $scope.selected = null;
  $scope.select = function(item) {
    angular.forEach($rootScope.App.menu.admin, function(item) {
      return item.selected = false;
    });
    angular.forEach($rootScope.App.menu.user, function(item) {
      return item.selected = false;
    });
    return item.selected = true;
  };
  $scope.sidebar = {
    closed: false
  };
  return $scope.toggleSidebar = function() {
    return $scope.sidebar.closed = !$scope.sidebar.closed;
  };
});
