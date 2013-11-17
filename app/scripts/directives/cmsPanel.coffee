'use strict'

angular.module('angularCmsBaseApp').directive('cmsPanel', () ->
	transclude: true
	replace: true
	scope: 
		id: '@'
		title: '@'
	template: """
    <div class="panel panel-default">
						<header class="panel-heading">
							{{title}}
						</header>
						<section class="panel-body" data-ng-transclude>
						</section>
					</div>
    """
	restrict: 'E'
	link: (scope, element, attrs) ->
		
	)