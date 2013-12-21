'use strict'

angular.module('angularCmsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  #'cms.Templates'
])
  .config ($routeProvider) ->
    
    routeResolver = 
      # I will cause a 1 second delay
      delay: ($q, $timeout) ->
        delay = $q.defer()
        $timeout delay.resolve, 1000
        delay.promise

    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/docs',
        templateUrl: 'views/docs.html'
        controller: 'DocsCtrl'
      .when '/admin',
        templateUrl: 'views/admin.html'
        controller: 'AdminCtrl'
      .otherwise
        redirectTo: '/'
