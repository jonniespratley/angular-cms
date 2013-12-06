'use strict'

angular.module('angularCmsApp').directive('cmsPanel', () ->
	transclude: true
	replace: true
	scope: 
		id: '@'
		title: '@'
	template: '<div class="panel panel-default"><header class="panel-heading">{{title}}</header><section class="panel-body" ng-transclude></section></div>'
	restrict: 'E'
	link: (scope, element, attrs) ->
		
	)