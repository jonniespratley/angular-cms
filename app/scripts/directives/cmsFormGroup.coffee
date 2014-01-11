'use strict'

angular.module('angularCmsApp')
  .directive('cmsFormGroup', () ->
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      element.text 'this is the cmsFormGroup directive'
  )
