'use strict'

###*
 # @ngdoc service
 # @name angularCmsApp.cmsSocketService
 # @description
 # # cmsSocketService
 # Service in the angularCmsApp.
###
angular.module('angularCmsApp').service 'cmsSocketService', ->
	# AngularJS will instantiate a singleton by calling "new" on this function
	WebSocketClient = (options) ->
		_ws = undefined
		_ws = new WebSocket(options.endpoint, options.protocol)
		_ws.onmessage = (e) ->
			console.log e.data

		_ws.onerror = (e) ->
			console.log e

		_ws.onclose = (e) ->
			console.log e

		_ws.onopen = (e) ->
			_ws.send "update"
			return
		instance: _ws
		close: ->
			_ws.close()

		send: (obj) ->
			try
				_ws.send obj
			catch err
				throw err
			return

	return WebSocketClient