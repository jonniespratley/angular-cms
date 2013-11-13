'use strict';

var app = angular.module('angularCmsBaseApp', []);


app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

		//TODO - Make configurable via settings > hash mode
    $locationProvider.html5Mode(false);
    
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
angular.module('angularCmsBaseApp').controller('AppCtrl', function ($rootScope, $http) {
    $rootScope.App = {
        config: {
            title: 'Angular-CMS'
        }

    };
});