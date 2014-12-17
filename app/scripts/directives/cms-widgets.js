
/**
@ngdoc directive
@name angularCmsApp.directive:cmsWidgets
@element div
@function

@description
	This is the container for widgets.

@example
<example module="angularCmsApp" > 

    <file name="jdx.html" >
        HTML example come here ==> `<div class="lior" ></div >`
    </file >

</example >
 */
'use strict';
angular.module('angularCmsApp').directive('cmsWidgets', function() {
  var postLink;
  return {
    restrict: 'EMA',
    replace: true,
    transclude: true,
    scope: {},
    template: '<div class="widgets">\n	<ul class="nav nav-pills">\n			<li ng-repeat="widget in widgets" ng-class="{active:widget.selected}">\n				<a href="" ng-click="select(widget)">{{widget.title}}</a>\n			</li>\n	</ul>\n	<div class="row" ng-transclude>\n	\n	</div>\n</div>',
    controller: function($scope) {
      var widgets;
      widgets = $scope.widgets = [];
      $scope.add = function(widget) {
        if (widgets.length === 0) {
          $scope.select(widget);
        }
        return widgets.push(widget);
      };
      return $scope.select = function(widget) {
        angular.forEach(widgets, function(widget) {
          return widget.selected = false;
        });
        return widget.selected = true;
      };
    },
    link: postLink = function(scope, element, attrs) {}
  };
});
