'use strict';
angular.module('angularCmsApp').controller('AppCtrl', function($scope, $rootScope, $http, $log, $route, $location, $routeParams, $cookieStore, cmsSessionService, DataService) {
  var App;
  App = Config;
  App.ds = DataService;
  App.route = $routeParams;
  App.session = cmsSessionService.getSession();
  App.theme = $cookieStore.get('App.theme');
  App.route = $route;
  App.location = $location;
  App.routeParams = $routeParams;
  App.roles = ['guest', 'user', 'admin'];
  $scope.name = 'AppCtrl';
  window.App = $scope.App = $rootScope.App = App;
  return angular.element(document).ready(function() {
    return angular.element('.nav').bind('click', 'a', function(e) {
      return $log.info(e);
    });
  });
});
