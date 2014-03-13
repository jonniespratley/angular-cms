'use strict'

angular.module('angularCmsApp').service('DataService', ['$http', '$q', '$resource', ($http, $q, $resource) ->
	defer = $q.defer()
	
	DataService = 
	
		#Endpoint location
		endpoint: '/api/v2/angular-cms/'

		###
		fetch - I fetch data from the angular-cms mongo backend api.
		###
		fetch: (collection, params) ->
			options = 
				params: params
			$http.get( @endpoint + collection, options ).success((data) ->
				defer.resolve(data)
			).error((err) -> 
				defer.reject(err)
			)
			return defer.promise
		
		#save - PUT or POST if object has id
		save: (collection, data) ->
			if data._id
				@update(collection data)
			else
				@create(collection, data)
		
		
		#Save - POST a object to the backend
		create: (collection, data) ->
			$http.post( @endpoint + collection, data ).success((data) ->
				defer.resolve(data)
			).error((err) -> 
				defer.reject(err)
			)
			return defer.promise
			
		#remove - POST a object to the backend
		destroy: (collection, data) ->
			$http.delete( @endpoint + collection + '/' +  data._id ).success((data) ->
				defer.resolve(data)
			).error((err) -> 
				defer.reject(err)
			)
			return defer.promise
		
		#update - PUT a object to the backend
		update: (collection, data) ->
			$http.put( @endpoint + collection + '/' + data._id, data ).success((data) ->
				defer.resolve(data)
			).error((err) -> 
				defer.reject(err)
			)
			return defer.promise
	
	#Add some rest methods
])