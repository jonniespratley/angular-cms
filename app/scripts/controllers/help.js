'use strict';
angular.module('angularCmsApp').controller('HelpCtrl', function($scope) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  $scope.readmeEl = angular.element('#readme');
  $scope.loadReadme = function() {
  };
});
