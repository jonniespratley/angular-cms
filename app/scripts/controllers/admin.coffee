'use strict'

angular.module('angularCmsApp')
.controller 'AdminCtrl', ($scope) ->
	$scope.awesomeThings = [
		'HTML5 Boilerplate'
		'AngularJS'
		'Karma'
	]
	window.socket = io.connect("http://localhost:8181")
	socket.on "message", (data) ->
		log.push data
		$("#output").val JSON.stringify(log)
		console.log data
		return

	$scope.App =
		logs: []
		messages: []
		socket: null
		defaults:
			socketServer: ""
			debug: false
			input: ""
			output: ""


		###*
		Handle initializing socket.io
		###
		init: (options) ->
			self = this
			@options = $.extend(@defaults, options)
			@socket = io.connect(@options.socketServer)
			@socket.on "connect", ->
				console.log "Connected to socket.io"
				return

			@socket.on "msg", (data) ->
				self.onMessage data
				return

			console.log "App.init", options
			return


		###*
		Handle the response from the server.
		###
		onMessage: (data) ->
			self = this
			self.log data
			self.addMessage data
			console.log "socket.io -> sent", data
			return


		###*
		Handle sending a message to socket.io server.
		@param data
		###
		send: (data) ->
			self = this
			self.input = ""
			console.log "sent -> socket.io ", data
			self.socket.emit "msgEvent", data, (response) ->
				response.from = "server"
				self.onMessage response
				return

			return


		###*
		Handle logging the messages.
		@param what
		###
		log: (what) ->
			self = this
			$scope.$apply ->
				self.logs.push what
				return

			return

		addMessage: (what) ->
			self = this
			$scope.$apply ->
				self.messages.push what
				return

			return

		clear: ->
			self = this
			self.messages = []
			self.logs = []
			return

	$scope.App.init
		socketServer: "/"
		input: "#input"
		output: "#output"


	log = (args) ->
		s += "[" + Date.now() + "] " + args.toString() + "\n"
		$("textarea").val s

	notify = (type, msg) ->
		html = "<div class=\"alert in fade alert-" + type + " alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>" + msg + "</div>"
		$(".messages").empty()
		$(".messages").append html
		return

	WebSocketClient = (options) ->
		_ws = undefined
		_ws = new WebSocket(options.endpoint, options.protocol)
		_ws.onmessage = (e) ->
			notify "info", e.data
			console.log e.data
			return

		_ws.onerror = (e) ->
			notify "danger", "There was an error"
			console.log e
			return

		_ws.onclose = (e) ->
			notify "danger", "Socket is now closed"
			console.log e
			return

		_ws.onopen = (e) ->
			notify "success", "Socket is now open"
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

	s = ""

	#Document
	$(document).ready ->
		ws = null

		#Open
		$(".btn-connect").click (e) ->
			options =
				endpoint: $("#ws-endpoint").val()
				protocol: $("#ws-protocol").val()

			ws = new WebSocketClient(options)
			console.log ws
			log "Connecting to socket"
			return


		#Close
		$(".btn-disconnect").click (e) ->
			ws.close()
			log "Disconnecting from socket"
			return


		#Send
		$(".btn-message").click (e) ->
			msg = $("#ws-msg").val()
			log "Sending: " + msg
			ws.send msg
			return

		return

