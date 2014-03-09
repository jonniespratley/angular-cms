angular.module('angularCmsApp').directive "cmsWidget", ->
	restrict: "E"
	replace: true
	transclude: true
	scope:
		id: "@"
		title: "@"
		size: "@"
		icon: "@"
	require: '?^cmsWidgets'
	template: '''
		<div class="col-md-{{size}}">
		<div id="widget-{{$id}}" class="panel panel-default {{selected ? 'selected' : ''}}">
			<header class="panel-heading clearfix">
				<!--i class="fa fa-chevron-right toggle" ng-show="icon"></i-->
				<i class="fa fa--{{icon}}" ng-show="icon"></i>
				{{title}}
			</header>
			<section class="panel-body" ng-transclude></section>
		</div>
	</div>
	'''
	link: (scope, element, attrs, ctrl) ->
		#console.log(ctrl)
		# Toggle the closed/opened state
		toggle = ->
			#console.log scope
			opened = not opened
			element.find("section").slideToggle(()->
					element.toggleClass (if opened then "closed" else "opened")
			)
			
		widgetTitle = element.find("header")
		widgetTitle.css(cursor: 'move')
		opened = true
		widgetTitle.bind "click", toggle
