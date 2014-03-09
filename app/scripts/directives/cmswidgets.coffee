'use strict'
angular.module('angularCmsApp')
.directive 'cmsWidgets', ->
	restrict: 'EMA'
	replace: true
	transclude: true
	scope: {}
	template: '''
	<div class="widgets">
		<ul class="nav nav-pills">
				<li ng-repeat="widget in widgets" ng-class="{active:widget.selected}">
					<a href="" ng-click="select(widget)">{{widget.title}}</a>
				</li>
		</ul>
		<div class="row" ng-transclude>
		
		</div>
	</div>
	'''
	controller: ($scope) ->
		widgets = $scope.widgets = []

		$scope.add = (widget) ->
			$scope.select widget	if widgets.length is 0
			widgets.push widget

		$scope.select = (widget) ->
			angular.forEach widgets, (widget) ->
				widget.selected = false
			widget.selected = true
	
	link: postLink = (scope, element, attrs) ->
		#console.log scope, element, attrs
