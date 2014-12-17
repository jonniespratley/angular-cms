'use strict';
angular.module('angularCmsApp').controller('HelpCtrl', function($scope, $http) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  $scope.readmeEl = angular.element('#readme');
  return $scope.loadReadme = function() {

    /*
    			$http.get('/api/v2/README').success((data) ->
    				$scope.readmeEl.html(data)
    			)
     */
  };
});
