'use strict'

angular.module('angularCmsApp').service('DataService', ['$http', '$q', '$resource', ($http, $q, $resource) ->


	DataService =

		#Endpoint location
		endpoint: '/api/v2/angular-cms/'

		###
		fetch - I fetch data from the angular-cms mongo backend api.
		###
		fetch: (collection, params) ->
			defer = $q.defer()
			options =
				cache: false
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
				@update(collection, data)
			else
				@create(collection, data)


		#Save - POST a object to the backend
		create: (collection, data) ->
			defer = $q.defer()
			$http.post( @endpoint + collection, data ).success((data) ->
				defer.resolve(data)
			).error((err) ->
				defer.reject(err)
			)
			return defer.promise

		#remove - POST a object to the backend
		destroy: (collection, data) ->
			defer = $q.defer()
			$http.delete( @endpoint + collection + '/' +  data._id ).success((data) ->
				defer.resolve(data)
			).error((err) ->
				defer.reject(err)
			)
			return defer.promise

		#update - PUT a object to the backend
		update: (collection, data) ->
			defer = $q.defer()
			$http.put( @endpoint + collection + '/' + data._id, data ).success((data) ->
				defer.resolve(data)
			).error((err) ->
				defer.reject(err)
			)
			return defer.promise
])
###
DataService = (apiEndpoint) ->
	@create = () ->
	@update = () ->
	@destroy = () ->
	@fetch = () ->

angular.module('angularCmsApp').provider( 'DataService', DataServiceProvider = ->
		useApiEndpoint = '/api/v2/'

		@useApiEndpoint = (value) ->
			useApiEndpoint = !!value
			return

		@$get = [
			"apiEndpoint", DataServiceFactory = (apiEndpoint) ->
				return new DataService(apiEndpoint, useApiEndpoint)
		]
		@method = () ->

		return
)
###
