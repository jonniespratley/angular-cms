# AngularJS will instantiate a singleton by calling "new" on this function
angular.module('angularCmsApp').service 'cmsSessionService',[ '$q', '$rootScope', '$cookieStore', '$location', '$log', ($q, $rootScope, $cookieStore, $location, $log) ->
	#Can use the sessionStorage in the browser
	#userIsAuthenticated = window.sessionStorage.getItem('userIsAuthenticated')
	
	#Using the angular-cookies module
	userIsAuthenticated = $cookieStore.get('App.session')

	#Set the user to authorized
	setUserAuthenticated = (value) ->
		window.sessionStorage.setItem('userIsAuthenticated', value)
		$cookieStore.put('App.session', value)
		userIsAuthenticated = value
		$log.info "user is authorized: #{userIsAuthenticated.authorized}"
	
	#Check if the user is authorized
	getUserAuthenticated = ->
		window.sessionStorage.getItem('userIsAuthenticated')
		$log.info "user is authorized: #{userIsAuthenticated.authorized}"
		return userIsAuthenticated.authorized
	
	#Listen for route to change and check the routes.
	$rootScope.$on "$locationChangeStart", (event, next, current) ->
		$rootScope.$emit('session:route:start', {event:event, next:next, current:current})
		$log.log(event, 'Next route', next, 'Current route', current)
		
		#Find active link and remove active
		angular.element('.active').removeClass('active')
		
		for i of window.routes
			unless next.indexOf(i) is -1
				if window.routes[i].requireLogin and not getUserAuthenticated()
					#TODO Need to display global alert
					msg = "You need to be authenticated to see this page!"
					$log.warn msg
					
					#Prevent page from loading
					event.preventDefault()
					
					$rootScope.$emit('session:unauthorized', event)
					$location.path('/')
					#document.location.reload()
					#document.location = '/'
				else
					#Find target link and make active
					angular.element('a[href="#'+$location.path()+'"]').addClass('active')
					$rootScope.$emit('session:authorized', event)
					#Redirect to index
					#document.location = '/'
		
	#SessionService public API
	SessionService = 
		adapter: null
		session: $cookieStore.get('App.session')
		isAuthenticated: false
		getUserAuthenticated: getUserAuthenticated
		setUserAuthenticated: setUserAuthenticated
		getSession: () ->
			if $cookieStore.get('App.session')
				$cookieStore.get('App.session')
			else 
				{}
		setSession: (value) ->
			$cookieStore.put('App.session', value)
		login: (user) ->
			$rootScope.$emit('session:login', user)
			SessionService.adapter?.login?(user)
		logout: (user) ->
			$rootScope.$emit('session:logout', user)
			SessionService.setUserAuthenticated(user)
			SessionService.adapter?.logout?(user)
		register: (user) ->
			$rootScope.$emit('session:register', user)
			SessionService.adapter?.register?(user)
		routeResolver: ()->

	#Return to public api
	return SessionService
]