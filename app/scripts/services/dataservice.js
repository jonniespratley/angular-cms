'use strict';
angular.module('angularCmsApp').service('DataService', ['$http', function ($http) {
		var DataService = {
			endpoint: '/api/v2/angular-cms',
			request: function (path, method, params, data) {
				var defaults;
				defaults = {
					method: method,
					url: this.endpoint + path,
					cache: false,
					data: data,
					params: params
				};
				return $http(defaults);
			},
			fetch: function (collection, params) {
				return this.request('/' + collection, 'GET', params);
			},
			get: function (collection, id, params) {
				return this.request('/' + collection + '/' + id, 'GET', params);
			},
			save: function (collection, data) {
				if (data && data._id) {
					return this._update(collection, data);
				} else {
					return this._create(collection, data);
				}
			},
			destroy: function (collection, data) {
				return this.request('/' + collection + '/' + data._id, 'DELETE');
			},
			_create: function (collection, data) {
				return this.request('/' + collection, 'POST', null, data);
			},
			_update: function (collection, data) {
				return this.request('/' + collection + '/' + data._id, 'PUT', null, data);
			}
		};
		return DataService;
	}
]);
