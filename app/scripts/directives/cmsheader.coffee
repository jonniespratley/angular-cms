'use strict'
angular.module('angularCmsApp').directive('cmsHeader', () ->
	template: '<div class="clearfix"><h1><i class="fa fa-1x fa-{{icon}}"></i> {{title}}</h1><hr/></div>'
	restrict: 'E'
	transclude: true
	replace: true
	scope:
		icon: '@'
		title: '@'
	link: (scope, element, attrs) ->
		#element.text 'this is the cmsHeader directive'
	)
