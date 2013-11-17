/**
 * Server - This is the Node.js Server.
 * @object
 */
var fs = require('fs'), util = require('util'), https = require('https'), http = require('http'), sio = require('socket.io'), httpProxy = require('http-proxy'), request = require('request'), inspect = require('util').inspect;

var colors = require('colors');
colors.setTheme({
	silly : 'rainbow',
	input : 'grey',
	verbose : 'cyan',
	prompt : 'grey',
	info : 'green',
	data : 'grey',
	help : 'cyan',
	warn : 'yellow',
	debug : 'blue',
	error : 'red'
});

// outputs red text
console.log("this is an silly".silly);
console.log("this is an input".input);
console.log("this is an verbose".verbose);
console.log("this is an prompt".prompt);
console.log("this is an info".info);
console.log("this is an data".data);
console.log("this is an help".help);
console.log("this is an debug".debug);
console.log("this is an error".error);
// outputs yellow text
console.log("this is a warning".warn);
/*
 * @TODO - HTTPS Key and Cert
 *
 * This is the location of your https cert and key.
 */
var httpsKey = fs.readFileSync('./config/apache.key').toString();
var httpsCert = fs.readFileSync('./config/apache.crt').toString();
var httpServer = null;
var httpsServer = null;
/*
 * @TODO - Proxy Options
 *
 * This object holds options used for creating a proxy server.
 *
 */
var options = {
	port : 8080,
	host : '127.0.0.1',
	key : httpsKey,
	cert : httpsCert,
	hostncmsOnly : true,
	router : {
	}
};

/* ======================[ @TODO: Dynamic REST API ]====================== */
var rest = require('./routes/rest').rest;
rest.init(9000);

/* @TODO: Proxy Server */
proxyServer = httpProxy.createServer(options, function(req, res, proxy) {

	// console.log('proxyServer', options);
	if(req.url.match(/^\/api\//)) {
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : 9000
		});
		console.log('Routing request: API server'.warn);

		//Match v1 api calls
	} else if(req.url.match(/^\/v1\//)) {
		proxy.proxyRequest(req, res, {
			host : 'www.myappmatrix.com',
			port : 443
		});
		console.log('Routing request: v1 API server'.warn);

		//Match pusher server calls
	} else if(req.url.match(/^\/aps\//)) {
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : 9595
		});
		console.log('Routing request: Pusher Server'.warn);

		//Custom server with yeoman and socketio
	} else if(req.url.match(/^\/smartpass\//)) {
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : 3535
		});
		console.log('Routing request: Passbook Server'.warn);

		//Match any /public dir and route to apache
	} else if(req.url.match(/^\/public\//)) {
		/* Default express server */
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : 78
		});
		console.log('Routing request: Apache Server'.warn);

	} else {
		/* Default express server */
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : 9000
		});
		console.log('Routing request: App Server'.warn);
	}
});
httpsServer = https.createServer(options, function(req, res) {
	res.writeHead(200, {
		'Content-type' : 'text/plain'
	});
	res.write('Request proxied ' + JSON.stringify(req.headers));
	res.end();
}).listen(9091);

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
//
//sio = require('socket.io'),
var SocketServer = {

	//###init(app)
	//I setup the socket server and listen for any routing requests from the express app.
	init : function(app) {
		var io = sio.listen(app);
		io.configure(function() {
			io.set('authorization', function(handshakeData, callback) {
				if(handshakeData.xdomain) {
					callback('Cross-domain connections are not allowed');
				} else {
					callback(null, true);
				}
			});
		});
		//Hold the ncmss of events that this socket server listens for and emits
		var CmsSocket = {
			events : {
				session : {
					pageView : 'cms:session:pageView',
					hashChange : 'cms:session:hashChange',
					login : 'cms:session:login',
					logout : 'cms:session:logout'
				},
				server : {
					message : 'cms:server:message',
					connected : 'cms:server:connect',
					disconnected : 'cms:server:disconnect'
				},
				client : {
					message : 'cms:client:message',
					connected : 'cms:client:connect',
					disconnected : 'cms:client:disconnect'
				}
			}
		};

		//Store a list of the connected clients
		var connections = [];

		//Handle when a client is connected.
		io.sockets.on('connection', function(socket) {

			//push to connections array
			connections.push(socket);

			//Publish the server connected event
			io.sockets.emit(CmsSocket.events.server.connected, {
				data : connections.length
			});

			//Listen for client connected
			socket.on(CmsSocket.events.client.connected, function(msg) {
				console.log(CmsSocket.events.client.connected, msg);
			});
			//Listen for any messages from the client
			socket.on(CmsSocket.events.client.message, function(content) {

				console.log(CmsSocket.events.client.message, JSON.stringify(content).debug);

				//Broadcast the event
				socket.emit(CmsSocket.events.server.message, {
					id : socket.id,
					data : content
				});
				socket.broadcast.emit(CmsSocket.events.server.message, {
					id : socket.id,
					data : content
				});
			});
			//Listen for any pageView events from the client
			socket.on(CmsSocket.events.session.pageView, function(message) {
				console.log(CmsSocket.events.session.pageView + message);
				ip = socket.handshake.address.address;
				url = message;

				//Broadcast the event
				io.sockets.emit(CmsSocket.events.session.pageView, {
					'connections' : Object.keys(io.connected).length,
					'ip' : ip,
					'url' : url,
					'xdomain' : socket.handshake.xdomain,
					'timestamp' : new Date()
				});
			});
			//handle disconnections
			socket.on('disconnect', function() {
				console.log("Socket disconnected");

				io.sockets.emit('cms:session:pageview', {
					'connections' : Object.keys(io.connected).length
				});

			});
		});
	}
};

//Start the websocket server
SocketServer.init(proxyServer);

//Start the proxy server
proxyServer.listen(9090);
