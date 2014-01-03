'use strict'
###
 * @ngdoc directive
 * @name rfx.directive:rAutogrow
 * @element textarea
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * @example
   <example module="rfx">
     <file name="index.html">
         <textarea ng-model="text" r-autogrow class="input-block-level"></textarea>
         <pre>{{text}}</pre>
     </file>
   </example>
###
angular.module('angularCmsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  '$strap.directives'
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
      .when '/login',
        templateUrl: 'views/login.html'
        controller: 'LoginCtrl'
      .when '/profile',
        templateUrl: 'views/profile.html'
        controller: 'ProfileCtrl'
      .when '/plugins',
        templateUrl: 'views/plugins.html'
        controller: 'PluginsCtrl'
      .when '/themes',
        templateUrl: 'views/themes.html'
        controller: 'ThemesCtrl'
      .when '/widgets',
        templateUrl: 'views/widgets.html'
        controller: 'WidgetsCtrl'
      .when '/media',
        templateUrl: 'views/media.html'
        controller: 'MediaCtrl'
      .when '/settings',
        templateUrl: 'views/settings.html'
        controller: 'SettingsCtrl'
      .when '/dashboard',
        templateUrl: 'views/dashboard.html'
        controller: 'DashboardCtrl'
      .when '/users',
        templateUrl: 'views/users.html'
        controller: 'UsersCtrl'
      .otherwise
        redirectTo: '/'

angular.module('angularCmsApp').controller 'AppCtrl', ['$scope', '$rootScope', '$http', '$log', '$route', '$location', '$routeParams', ($scope, $rootScope, $http, $log, $route, $location, $routeParams) ->
	App = Config
	App.route = $routeParams;
	
	$rootScope.angularCmsApp = App;
	$rootScope.App = App;
	$rootScope.$route = $route;
	$rootScope.$location = $location;
	$rootScope.$routeParams = $routeParams;
	
	window.angularCmsApp = $rootScope.angularCmsApp;
	
	$log.info($rootScope);
	

]