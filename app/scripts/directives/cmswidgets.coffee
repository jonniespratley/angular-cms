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
		<div ng-transclude>
		
		</div>
	</div>
	'''
	controller: ($scope) ->
		widgets = $scope.widgets = []
		$scope.select = (widget) ->
			console.log widget
			angular.forEach widgets, (widget) ->
				widget.selected = false
			widget.selected = true
	
		@add = (widget) ->
			console.log widget
			$scope.select widget	if widgets.length is 0
			widgets.push widget
			
	link: postLink = (scope, element, attrs) ->
		console.log scope, element, attrs
.directive "cmsWidget", ->
	scope:
		id: "@"
		title: "@"
		icon: "@"
	require: '^cmsWidgets'
	template: '''
		<section id="widget-{{$id}}" class="widget {{selected ? 'selected' : ''}}">
			<header class="widget-header clearfix">
				<!--i class="icon-chevron-right toggle" ng-show="icon"></i-->
				<i class="icon-{{icon}}" ng-show="icon"></i>
				<h3>{{title}}</h3>
				
			</header>
			<section class="widget-content" ng-transclude></section>
		</section>
	'''
	restrict: "E"
	replace: true
	transclude: true
	link: (scope, element, attrs, ctrl) ->
		ctrl.add(scope)
		# Toggle the closed/opened state
		toggle = ->
			console.log scope
			opened = not opened
			element.find(".widget-content").slideToggle(()->
					element.toggleClass (if opened then "closed" else "opened")
			)
			
		widgetTitle = element.find(".widget-header")
		widgetTitle.css(cursor: 'move')
		opened = true
		widgetTitle.bind "click", toggle
