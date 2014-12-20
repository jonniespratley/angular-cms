
/**
 @ngdoc directive
 @name angularCmsApp.directive:cmsFormGroup
 @element div
 @function

 @description
 	Resize textarea automatically to the size of its text content.
 	**Note:** ie<9 needs pollyfill for window.getComputedStyle

 @example
   <example module="angularCmsApp">
     <file name="index.html">
         <textarea ng-model="text"rx-autogrow class="input-block-level"></textarea>
         <pre>{{text}}</pre>
     </file>
   </example>
 */
'use strict';
angular.module('angularCmsApp').directive('cmsFormGroup', function() {
  return {
    template: '<div class="form-group"><label class="control-label col-sm-3 col-xs-3">{{label}}</label><div class="controls col-sm-9 col-xs-9" ng-transclude></div></div>',
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      label: '@',
      hint: '@'
    },
    link: function(scope, element, attrs) {
      console.log(attrs);
      return element.find('input').addClass('form-control');
    }
  };
});
