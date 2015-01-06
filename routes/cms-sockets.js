var events = require('events'),
	util = require('util'),
	q = require('q'),
	WebSocketServer = require('websocket').server,
	WebSocketRouter = require('websocket').router;

////////////////////////////
//## Socket Server
//This is a socket server implementation for 'real' time analytics and other data.
//This is for use with geo analytics and other backend data from the app. listen for connected clients
//
// ### Server Channels
//These are the events that this socket server dispatches.
//
//1. cms:authorization
//2. cms:client:message
//3. cms:client:connect
//4. cms:client:disconnect
//5. cms:server:message
//6. cms:server:disconnect
//7. cms:server:connect
//8. cms:
module.exports = function (config, app) {
	'use strict';
	events.EventEmitter.call(this);
	console.warn('cms-socket initialized');

	//Start the websocket server
	//SocketServer.init(proxyServer);
	var cmsSockets = {},
		connections, wsserver, wsclient, router, self = cmsSockets;


	var delay = function (fn, time) {
		var defer = q.defer();
		setTimeout(function () {
			fn();
			defer.resolve();
		}, time);
		return defer.promise;
	};

	var delayedSocketPush = function (socket, time) {
		return delay(function (msg) {
			socket.emit('msg', {
				datetime: new Date(),
				message: msg,
				id: 'Server'
			});
		}, time);
	};

	//Hold the names of events that this socket server listens for and emits
	self.events = {
		session: {
			pageView: 'cms:session:pageView',
			hashChange: 'cms:session:hashChange',
			login: 'cms:session:login',
			logout: 'cms:session:logout'
		},
		server: {
			message: 'cms:server:message',
			connected: 'cms:server:connect',
			disconnected: 'cms:server:disconnect'
		},
		client: {
			message: 'cms:client:message',
			connected: 'cms:client:connect',
			disconnected: 'cms:client:disconnect'
		}
	};


	//Store a list of the connected clients
	connections = [];

	var serverConfig = {
		httpServer: app,
	};

	wsserver = new WebSocketServer();
	wsserver.mount(serverConfig);

	router = new WebSocketRouter();
	router.attachServer(wsserver);

	/**
	 * Angular-CMS Protocol
	 */
	router.mount('*', 'angular-cms', function (request) {
		console.log('mounted to angular-cms protocol');

		var conn = request.accept(request.origin);

		conn.on('message', function (message) {
			console.log('routed message', util.inspect(message, {colors: true}));

			conn.send('Recieved by server');
		});
		conn.send('hey');
	});
	/**
	 * Echo Protocol
	 */
	router.mount('*', 'echo-protocol', function (request) {
		console.log('mounted to echo protocol');

		var conn = request.accept(request.origin);

		conn.on('message', function (message) {
			console.log('routed message', util.inspect(message, {colors: true}));
		});
		conn.send('hey');
	});

	/**
	 * Update Protocol
	 */
	router.mount('*', 'update-protocol', function (request) {
		console.log('mounted to update protocol');
		var conn = request.accept(request.origin);
		conn.on('message', function (message) {
			console.log('update all the things', message);
		});
	});

	util.inherits(cmsSockets, events.EventEmitter);

};
