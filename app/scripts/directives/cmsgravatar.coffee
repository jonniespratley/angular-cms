'use strict'

angular.module('angularCmsApp')
  .directive('cmsGravatar', () ->
    template: '<div></div>'
    restrict: 'E'
    scope: 
      email: '@'
    link: (scope, element, attrs) ->
      element.text 'this is the cmsGravatar directive'
  )
