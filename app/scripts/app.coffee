'use strict'

angular.module('angularCmsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/docs',
        templateUrl: 'views/docs.html'
        controller: 'DocsCtrl'
      .otherwise
        redirectTo: '/'
