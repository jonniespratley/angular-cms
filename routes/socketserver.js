//socketserver.js
////////////////////////////
//## Socket Server
//This is a socket server implementation for "real" time analytics and other data.
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
//Start the websocket server
//SocketServer.init(proxyServer);

var sio = require( 'socket.io' );
//Hold the ncmss of events that this socket server listens for and emits
var CmsSocket = {
	events: {
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
	}
};
var SocketServer = {
	connections: [],
	events: {
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
	},
	//###init(app)
	//I setup the socket server and listen for any routing requests from the express app.
	init: function (app) {
		var self = this;

		io = sio.listen( app );
		io.configure( function () {
			io.set( 'authorization', function (handshakeData, callback) {
				if (handshakeData.xdomain) {
					callback( 'Cross-domain connections are not allowed' );
				} else {
					callback( null, true );
				}
			} );
		} );
		//Store a list of the connected clients
		var connections = [];

		//Handle when a client is connected.
		io.sockets.on( 'connection', function (socket) {

			//push to connections array
			self.connections.push( socket );

			//Publish the server connected event
			io.sockets.emit( CmsSocket.events.server.connected, {
				data: self.connections.length
			} );

			//Listen for client connected
			socket.on( CmsSocket.events.client.connected, function (msg) {
				console.log( CmsSocket.events.client.connected, msg );
			} );

			//Listen for any messages from the client
			socket.on( CmsSocket.events.client.message, function (content) {

				console.log( CmsSocket.events.client.message, JSON.stringify( content ).debug );

				//Broadcast the event
				socket.emit( CmsSocket.events.server.message, {
					id: socket.id,
					data: content
				} );
				socket.broadcast.emit( CmsSocket.events.server.message, {
					id: socket.id,
					data: content
				} );
			} );
			//Listen for any pageView events from the client
			socket.on( CmsSocket.events.session.pageView, function (message) {
				console.log( CmsSocket.events.session.pageView + message );
				ip = socket.handshake.address.address;
				url = message;

				//Broadcast the event
				io.sockets.emit( CmsSocket.events.session.pageView, {
					'connections': Object.keys( io.connected ).length,
					'ip': ip,
					'url': url,
					'xdomain': socket.handshake.xdomain,
					'timestamp': new Date()
				} );
			} );

			//handle disconnections
			socket.on( 'disconnect', function () {
				console.log( "Socket disconnected" );

				io.sockets.emit( 'cms:session:pageview', {
					'connections': Object.keys( io.connected ).length
				} );

			} );
		} );
		return this;
	}
};

exports.SocketServer = SocketServer;
