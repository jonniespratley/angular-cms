'use strict'

angular.module('angularCmsApp')
  .directive('cmsHeader', () ->
    template: '<h1><i class="fa fa-1x fa-{{icon}}"></i> {{title}}</h1><hr>'
    restrict: 'E'
    scope:
    	icon: '@'
    	title: '@'
    link: (scope, element, attrs) ->
      #element.text 'this is the cmsHeader directive'
  )
