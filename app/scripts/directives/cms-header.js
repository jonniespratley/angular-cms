
/**
 @ngdoc directive
 @name angularCmsApp.directive:cmsHeader
 @element div
 @function
 @description
 	Provides a directive for adding a standardized header across pages.
 
 @example
   <example module="angularCmsApp">
     <file name="index.html">
         <cms-header title="My Header" icon="file"></cms-header>
     </file>
   </example>
 */
'use strict';
angular.module('angularCmsApp').directive('cmsHeader', function() {
  return {
    template: '<div class="page-header"><h1><i class="fa fa-1x fa-{{icon}}"></i> {{title}}</h1></div>',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      icon: '@',
      title: '@'
    },
    link: function(scope, element, attrs) {}
  };
});
