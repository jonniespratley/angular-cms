'use strict'

angular.module('angularCmsApp').provider 'cmsDataServiceProvider', [->
		# Private variables
		useAdapter = null
		@useAdapter = (value) ->
			useAdapter = !!value
		
		# Private constructor
		class cmsDataService
			@get = ->
				useAdapter
			
			# Method for instantiating
			@$get = ->
				new cmsDataService()
			
			# Public API for configuration
			@setAdapter = (s) ->
				useAdapter = s
				console.log 'setting adapter'
			
  ]
