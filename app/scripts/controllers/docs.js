'use strict';

angular.module('angularCmsBaseApp').controller('DocsCtrl', function($scope, $http) {

	$scope.readme = '';

	$scope.loadReadme = function() {
		$http.get('/api/v2/README').success(function(data) {
			$scope.readme = data;
			$scope.tocify();
		});
	};

	$scope.tocify = function() {
		//Executes your code when the DOM is ready.  Acts the same as $(document).ready().
		$(function() {
			setTimeout(function() {
				//Calls the tocify method on your HTML div.
				$("#toc").tocify({
					hashGenerator : 'compact',
					content : '#docs-content'
				});
			}, 500);
		});
	};

	$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
});
