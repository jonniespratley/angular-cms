
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

angular.module('angularCmsApp').directive('cmsWidgets', function() {
  'use strict';
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
      $scope.select = function(widget) {
        angular.forEach(widgets, function(widget) {
          widget.selected = false;
        });
        widget.selected = true;
      };
    }
  };
});
