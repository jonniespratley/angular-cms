'use strict';

var app = angular.module('angularCmsBaseApp', []);


app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {






		//TODO - Make configurable via settings > hash mode
    $locationProvider.html5Mode(true);
    
    //TODO - Make configurable via settings > routes
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminCtrl'
        })
        .when('/docs', {
            templateUrl: 'views/docs.html',
            controller: 'DocsCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
        })
        .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);



/**
 * Global app ctr
 */
angular.module('angularCmsBaseApp').controller('AppCtrl', function ($rootScope, $http, $route, $location, $routeParams, $log) {
    var App = {
    		route: $routeParams,
    		location: $location,
        config: {
            title: 'Angular-CMS'
        }

    };
    
    
    $rootScope.$on('$routeChangeStart', function(event, next, current){
    	console.dir(event, next, current);
    });
    
    
    
    
    $rootScope.App = App;
    
    console.log($rootScope.App);
    
    
    
});