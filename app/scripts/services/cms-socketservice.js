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




		_ws.onerror = function (e) {
			console.error(e, 'socket error');
		};

		_ws.onclose = function (e) {
			console.warn(e, 'socket closed');
		};


		_ws.onopen = function (e) {
			_ws.send('update');
			console.warn(e, 'socket opened');
		};


		return {
			instance: _ws,
			close: function () {
				return _ws.close();
			},
			on: function(eventName, callback){
				_ws.onmessage = function (e) {
					var args = arguments;
					$rootScope.$apply(function(){
						callback.apply(_ws, args);
					});
				};
			},
			emit: function(eventName, data, callback){

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