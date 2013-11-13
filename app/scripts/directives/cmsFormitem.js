'use strict';

angular.module('angularCmsBaseApp')
  .directive('cmsFormitem', function () {
    return {
    	transclude: true,
    	replace: true,
    	scope: {
    		id: '@',
    		label: '@'
    	},
      template: '<div class="form-group"><label for="{{id}}" class="col-sm-2 control-label">{{label}}</label><div class="col-sm-10" ng-transclude></div></div>',
      restrict: 'EMA',
      link: function postLink(scope, element, attrs) {
        console.log('this is the cmsFormitem directive');
      }
    };
  });
