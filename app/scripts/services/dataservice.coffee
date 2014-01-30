'use strict'

angular.module('angularCmsApp').service('DataService', ['$http', '$q', ($http, $q) ->
	defer = $q.defer()
	
	DataService = 
		#Endpoint location
		endpoint: 'http://jonniespratley.me:8181/api/v2/angular-cms/'

		###
		fetch - I fetch data from the angular-cms mongo backend api.
		###
		fetch: (col, params) ->
			options = 
				params: 
					callback: 'JSON_CALLBACK'
			$http.jsonp(@endpoint+col, options).success((data) ->
				defer.resolve(data)
				console.log data
			).error((err) -> 
				defer.reject(err)
				console.log err
			)
			return defer.promise
		
])