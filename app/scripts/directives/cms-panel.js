
/**
@ngdoc directive
@name angularCmsApp.directive:cmsPanel
@description This is a panel for angular-cms.

@example
<example module="angularCmsApp" > 

    <file name="jdx.html" >
        HTML example come here ==> `<div class="lior" ></div >`
    </file >

</example >
 */
'use strict';
angular.module('angularCmsApp').directive('cmsPanel', function() {
  return {
    transclude: true,
    replace: true,
    scope: {
      id: '@',
      title: '@'
    },
    template: '<div class="panel panel-default">\n	<header class="panel-heading">{{title}}</header>\n	<section class="panel-body" ng-transclude></section>\n</div>\'',
    restrict: 'E',
    link: function(scope, element, attrs) {}
  };
});
