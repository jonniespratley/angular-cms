'use strict'

angular.module('angularCmsApp').service 'cmsSessionService',['$q', '$rootScope', ($q, $rootScope) ->
  
  #userIsAuthenticated = window.sessionStorage.getItem('userIsAuthenticated')
	userIsAuthenticated = false
  
	@setUserAuthenticated = (value) ->
		#window.sessionStorage.setItem('userIsAuthenticated', value)
		userIsAuthenticated = value
    
	@getUserAuthenticated = ->
		#window.sessionStorage.getItem('userIsAuthenticated')
		return userIsAuthenticated

  return this
]