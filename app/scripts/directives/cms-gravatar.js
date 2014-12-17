
/**
@ngdoc directive
@name angularCmsApp.directive:cmsGravatar
@element div
@function
 
@description
	This is a Gravatar directive for displaying an image by a users email address.

@example
<example module="angularCmsApp" > 

    <file name="jdx.html" >
        HTML example come here ==> `<div class="lior" ></div >`
    </file >

</example >
 */
'use strict';
angular.module('angularCmsApp').directive('cmsGravatar', function() {
  return {
    template: '<div></div>',
    restrict: 'E',
    scope: {
      email: '@'
    },
    link: function(scope, element, attrs) {
      return element.text('this is the cmsGravatar directive');
    }
  };
});
