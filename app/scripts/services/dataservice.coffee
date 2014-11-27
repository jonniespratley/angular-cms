'use strict'

angular.module('angularCmsApp').service('DataService', ['$http', '$q', '$resource', ($http, $q, $resource) ->
	DataService =

		#Endpoint location
		endpoint: '/api/v2/angular-cms'

		#Generic request method
		request: (path, method, params, data) ->
			defaults = {
				method: method
				url: @endpoint + path
				cache: false
				data: data
				params: params
			}
			console.log(path, defaults )
			return $http(defaults)

		#fetch - I fetch data from the angular-cms mongo backend api.
		fetch: (collection, params) ->
			@request("/#{collection}", 'GET', params)

		#get - GET a object by id on the backend
		get: (collection, id, params) ->
			@request("/#{collection}/#{id}", 'GET', params)

		#save - PUT or POST if object has id
		save: (collection, data) ->
			if data._id
				return @_update(collection, data)
			else
				return @_create(collection, data)

		#remove - POST a object to the backend
		destroy: (collection, data) ->
			@request("/#{collection}/#{data._id}", 'DELETE')

		#Save - POST a object to the backend
		_create: (collection, data) ->
			@request("/#{collection}", 'POST', null, data)

		#update - PUT a object to the backend
		_update: (collection, data) ->
			@request("/#{collection}/#{data._id}", 'PUT', null, data)

	return DataService
])
