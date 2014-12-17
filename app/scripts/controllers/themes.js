'use strict';
angular.module('angularCmsApp').controller('ThemesCtrl', function($scope, $rootScope, $cookieStore) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  return $scope.selectTheme = function(theme) {
    $cookieStore.put('App.theme', theme);
    return $rootScope.App.theme = theme;
  };
});
