'use strict';
angular.module('angularCmsApp').controller('DashboardCtrl', function($scope) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  return $scope.fullscreen = function() {
    var i;
    i = document.getElementById("dashboard");
    if (i.requestFullscreen) {
      return i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      return i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      return i.mozRequestFullScreen();
    } else {
      if (i.msRequestFullscreen) {
        return i.msRequestFullscreen();
      }
    }
  };
});
