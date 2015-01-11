
/**
 @ngdoc directive
 @name angularCmsApp.directive:cmsWidget
 @element div
 @function

 @description
 	Provides a widget component that acts as a container for other content.

 @example
   <example module="angularCmsApp">
     <file name="index.html">
         <cms-widget title="My Widget" icon="file">
         	This is my content.
         </cms-widget>
     </file>
   </example>
 */
angular.module('angularCmsApp').directive('cmsWidget', function() {
  'use strict';
  return {
    restrict: 'ECA',
    replace: true,
    transclude: true,
    scope: {
      id: "@",
      title: "@",
      size: "@",
      icon: "@"
    },
    require: '?^cmsWidgets',
    template: '	<div class="col-md-{{size}} widget"><div id="widget-{{$id}}" class="panel panel-default {{selected ? \'selected\' : \'\'}}">\n		<header class="panel-heading clearfix">\n			<i class="fa fa-chevron-right toggle" ng-show="icon"></i>\n			{{title}}\n		</header>\n		<section class="panel-body" ng-transclude></section>\n	</div>\n</div>',
    link: function(scope, element, attrs, ctrl) {
      var opened, toggle, widgetTitle;
      toggle = function() {
        var opened;
        opened = !opened;
        element.find('section').slideToggle(function() {
          element.toggleClass((opened ? 'closed' : 'opened'));
        });
      };
      widgetTitle = element.find('header');
      widgetTitle.css({
        cursor: 'move'
      });
      opened = true;
      widgetTitle.bind('click', toggle);
    }
  };
});
