'use strict';
angular.module('angularCmsApp').controller('MediaCtrl', function($scope, $http, DataService) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  $scope.uploads = [];
  $scope.getUploads = function() {
    DataService.fetch('uploads').then(function(res) {
      return $scope.uploads = res.data;
    });
    return $scope.uploader = {
      files: []
    };
  };
  return $scope.getUploads();
});
