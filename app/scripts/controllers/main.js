'use strict';

angular.module('angularCmsBaseApp').controller('MainCtrl', function($scope) {
	$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];

	angular.element(document).ready(function() {
		angular.element('[data-toggle=offcanvas]').click(function() {
			console.log(this);
			angular.element('.row-offcanvas').toggleClass('active');
		});
	});
});
