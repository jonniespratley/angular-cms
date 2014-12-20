'use strict';

/**
 * @ngdoc service
 * @name angularCmsApp.cmsSocketService
 * @description
 * # cmsSocketService
 * Service in the angularCmsApp.
 */
angular.module('angularCmsApp').factory('cmsSocketService', function ($rootScope) {
	/**
	 * I am a WebSocketClient
	 * @param options
	 * @returns {{instance: WebSocket, close: Function, send: Function}}
	 * @constructor
	 */
	var WebSocketClient = function (options) {
		var _ws = new WebSocket(options.endpoint, options.protocol);
		_ws.onmessage = function (e) {
			$rootScope.$emit(options.protocol, e);
			return console.log(e.data);
		};
		_ws.onerror = function (e) {
			return console.log(e);
		};
		_ws.onclose = function (e) {
			return console.log(e);
		};
		_ws.onopen = function (e) {
			_ws.send('update');
		};
		return {
			instance: _ws,
			close: function () {
				return _ws.close();
			},
			send: function (obj) {
				try {
					_ws.send(JSON.stringify(obj));
				} catch (err) {

					throw err;
				}
			}
		};
	};
	return WebSocketClient;
});
