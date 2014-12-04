'use strict'
###*
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
Parse.initialize "fYHs4Flnj7vgVHm9vaFiFTSKt5Mj2Bxf9e93mTOB", "QPFGBNHs0QQHFS54atV71oKppd3gTgaFfQIHP2VW"


app = angular.module('angularCmsApp', [
	'ngCookies'
	'ngResource'
	'ngSanitize'
	'ngRoute'
	'ngAnimate'
	'mgcrea.ngStrap'
	#'cms.Templates'
])
	.config ($routeProvider) ->
		#Resolve routes
		routeResolver =
			# I will cause a 1 second delay
			delay: ($q, $timeout) ->
				delay = $q.defer()
				$timeout delay.resolve, 1000
				delay.promise

		#Router Config
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
			.when '/users',
				templateUrl: 'views/users.html'
				controller: 'UsersCtrl'
			.when '/login',
				templateUrl: 'views/login.html'
				controller: 'LoginCtrl'
			.when '/register',
				templateUrl: 'views/register.html'
				controller: 'RegisterCtrl'
			.when '/dashboard',
				templateUrl: 'views/dashboard.html'
				controller: 'DashboardCtrl'
			.when '/profile',
				templateUrl: 'views/profile.html'
				controller: 'ProfileCtrl'
			.when '/pages',
				templateUrl: 'views/pages.html'
				controller: 'PagesCtrl'
				resolve:
					pages : (DataService) ->
						DataService.fetch('pages').then((res)->
							return res.data
						)
			.when '/help',
			  templateUrl: 'views/help.html'
			  controller: 'HelpCtrl'
			.when '/forgot-password',
			  templateUrl: 'views/forgot-password.html'
			  controller: 'ForgotPasswordCtrl'
			.when '/register',
			  templateUrl: 'views/register.html'
			  controller: 'RegisterCtrl'
			.otherwise
				redirectTo: '/'
