'use strict'

angular.module('angularCmsApp').directive('cmsFormGroup', () ->
		template: """
	<div class="form-group">
		<label class="control-label col-sm-3 col-xs-3">{{label}}:</label>
		<div class="controls col-sm-9 col-xs-9" ng-transclude>
		</div>
	</div>
	"""
		replace: true
		transclude: true
		scope: 
			label: '@'
			hint: '@'
		link: (scope, element, attrs) ->
			console.log(scope, element)
			element.find('input').addClass('form-control')
			#element.text 'this is the cmsFormGroup directive'
	)
