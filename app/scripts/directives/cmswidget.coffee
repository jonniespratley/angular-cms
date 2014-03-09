angular.module('angularCmsApp').directive "cmsWidget", ->
	restrict: "E"
	replace: true
	transclude: true
	scope:
		id: "@"
		title: "@"
		icon: "@"
	require: '?^cmsWidgets'
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
	link: (scope, element, attrs, ctrl) ->
		#console.log(ctrl)
		# Toggle the closed/opened state
		toggle = ->
			#console.log scope
			opened = not opened
			element.find(".widget-content").slideToggle(()->
					element.toggleClass (if opened then "closed" else "opened")
			)
			
		widgetTitle = element.find(".widget-header")
		widgetTitle.css(cursor: 'move')
		opened = true
		widgetTitle.bind "click", toggle
