'use strict';

var angularCmsApp = angular.module('angularCmsApp', ['ui'])
  .config(['$routeProvider', function($routeProvider) {
    var routeResolver = {
        delay : function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 500);
            return delay.promise;
        }
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: routeResolver
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/server', {
        templateUrl: 'views/server.html',
        controller: 'ServerCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/forgot', {
        templateUrl: 'views/forgot.html',
        controller: 'ForgotCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

/* ======================[ @TODO: GLobal app controller ]====================== */
angularCmsApp.controller('AppCtrl', function($scope, $rootScope, $http, $compile, Api) {
	//https://dl.dropbox.com/u/26906414/jonniespratley.me/jonnie/
	$rootScope.cdn = '/assets/jonnie/';



	$rootScope.App = {
		Api: Api,
		projects:{},
		syncProjects: function(items){
		    if(!items){
		        items = $rootScope.App.content.portfolio.data; 
		    }
			angular.forEach(items, function(o){
				Api.create('projects', o, function(result){
					console.log('API-save', o, result);
				});
			});
			return items;
		},
		liveProjects:function(){
		    $rootScope.App.Api.get('projects', null, function(data){
                $rootScope.App.content.portfolio.data = data;
                return data;
            });

		},
		localProjects: function(){
			$http.get('/assets/packages.json').success(function(data){
				$rootScope.App.content.packages.data = data;
				return data;
			});
		},
		sitetitle: 'angular-cms',
		menu: {
			nav: [
		//		{id: null, href: '#/', title: 'Home'},
				//{id: null, href: '#/', title: 'About'},
				{id: null, href: '#/settings', title: 'Settings'},
			//	{id: null, href: '#/code', title: 'Code'},
			//	{id: null, href: '#/contact', title: 'Contact'}
			]
		},
		content:{
			profile: {
				title: 'Jonnie Spratley',
				subtitle: 'JavaScript Expert, Application Architect',
				image: '/assets/jonnie/avatar.png',
				data:[
					{ title: 'AppMatrix, Inc.', icon: 'home' },
					{ title: 'Citrus Heights, CA', icon: 'map-marker' },
					{ title: 'jonniespratley', icon: 'facebook' },
					{ title: 'jonniespratley', icon: 'twitter' },
					{ title: 'jonniespratley@me.com', icon: 'envelope-alt' }
				],
				address: 'PO BOX 340091, Sacramento, CA 95834-0091',
				phone: '(916) 802-8618',
				fax: '(916) 515-0347'
			},
			/* ======================[ @TODO: Home page of the website ]====================== */
			home: {
				title: 'Profile',
				body: 'I am excellent listener and communicator who effectively brings information verbally as well as in writing. Highly analytical thinking with demonstrated talent for identifying, scrutinizing, improving, and streamlining complex work processes. \nI am a computer-literate with extensive software proficiency covering wide variety of applications as well as programming all types of web applications. \nI am also a flexible team player who thrives in environments requiring ability to prioritize effectively and juggle multiple concurrent projects, and a driven achiever with exemplary planning and organizational skills, along with a high degree of detail orientation ',
				features: [
					{ slug: 'schedule', icon: 'desktop', image:'polaroid', title: 'Schedule', href: '/schedule', body: 'Just pick your day, time, package and your ready to go!' },
					{ slug: 'about', icon: 'bank', image:'polaroid', title: 'We Come to You', href: '/schedule', body: 'Our detailers come to your residence fully equipped with state of the art trailers ready to take care of business.' },
					{ slug: 'enjoy', icon: 'users', image:'polaroid', title: 'Enjoy', href: '/schedule', body: 'Whether your preparing to sell your vechicle or just want it clean, Lion Solutions has something to fit your needs.' }
				],
				slider:[
					{ slug: 'slider-1', title: 'slider-1', image: 'http://placehold.it/530x320', type: 'active' },
					{ slug: 'slider-2', title: 'slider-2', image: 'http://placehold.it/530x320', type: '' },
					{ slug: 'slider-3', title: 'slider-3', image: 'http://placehold.it/530x320', type: '' }
				],
				/* ======================[ @TODO: Sections of the profile page ]====================== */
				sections: [
					{ 
						slug: 'education', icon: 'book', title: 'Education', 
						data: [
							{ title: 'High School Diploma', subtitle: '', body: '' }
						] 
					}
				]
			},			
			repos: {
				title: 'Open Source Projects',
				body: '',
				data: [
					{ id: null, title: 'jps-passbook-manager', body: 'A Passbook manager built with Bootstrap, Angular.js and MongoDB, with Node and express to serve the API.', url: 'https://github.com/jonniespratley/jps-passbook-manager' },
					{ id: null, title: 'jspratley', body: 'This is my personal website that showcases all of my work.', url: 'https://github.com/jonniespratley/jspratley' },
					{ id: null, title: 'angular-cms', body: 'A lightweight content management system build with the solid Angular.js framework.', url: 'https://github.com/jonniespratley/angular-cms' },
					{ id: null, title: 'angular-mobile', body: 'HTML5 mobile components built with Angular.js', url: 'https://github.com/jonniespratley/angular-mobile.js' },
					{ id: null, title: 'jps-codegen', body: 'A Code Generator for various programming languages.', url: 'https://github.com/jonniespratley/jps-codegen' },
					{ id: null, title: 'flex-codegen', body: 'Code Generator for Flex and PHP based applications.', url: 'https://code.google.com/p/flex-codegen/' },
					{ id: null, title: 'amfphp-redux', body: 'A remix of amfphp with tons of features', url: 'https://code.google.com/p/amfphp-redux/' },
					{ id: null, title: 'flex-databasemanager', body: 'Flex MySQL Monitor, Manager, Query Builder,', url: 'https://code.google.com/p/flex-databasemanager/' },
					{ id: null, title: 'flex-formgen', body: 'Flex based HTML Form Generator', url: 'https://code.google.com/p/flex-formgen/' },
					{ id: null, title: 'flex-textpattern', body: 'Textpattern admin manager built with Flex', url: 'https://code.google.com/p/flex-textpattern/' },
					{ id: null, title: 'flex-wordpress', body: 'Flex Admin interface for WordPress', url: 'https://code.google.com/p/flex-wordpress/' },
					{ id: null, title: 'jquery-jtwitter', body: 'jQuery plugin that allows full access of the Twitter API through a PHP proxy class.', url: 'https://code.google.com/p/jquery-jtwitter/' }
				]
			},
			portfolio: {
				title: '',
				body: '',
				data: [
					{ id: null, title: 'Web Design', type: 'section', body:'' },
					{ id: null, title: 'Advanced Guide to Flex', type: 'post', image: '/assets/jonnie/images/post_acdguide1.png', body:'' }
				]
			},			
			settings: {
				title: '',
				body: '',
				data: [
					{ id: null, title: 'Web Design', type: 'section', body:'' },
					{ id: null, title: 'Advanced Guide to Flex', type: 'post', image: '/assets/jonnie/images/post_acdguide1.png', body:'' }
				]
			}
		},
		init: function(config){
			this.settings = config;
			this.localProjects();
			return this;
		},
		project:null,
		loadReadme: function(where, el){
			$http.get(where).success(function(data){
				angular.element(el).html(markdown.toHTML(data));
			});	
		},
		selectProject: function(p){
			this.project = p;


			this.loadReadme('/assets/jonnie/'+p.project+'/README.md', '#project-markdown-content');
		}
	};


	var pageTracker = pageTracker || {};

	$rootScope.$on('$routeChangeSuccess', function () {
		//	pageTracker = _gat._createTracker('UA-40428307-1');
		//	pageTracker._trackPageview();
	});

	window.App = $rootScope.App.init(AppConfig);
	
	
});