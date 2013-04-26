/**
 * Server - This is the AppMatrixEngine Node.js Server.
 * @file /WWW/AppMatrixEngine/ame-angular/server.js
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
console.log("this is an error".error);
// outputs yellow text
console.log("this is a warning".warn);
/*
 * @TODO - HTTPS Key and Cert
 *
 * This is the location of your https cert and key.
 */
var httpsKey = fs.readFileSync('./config/myappmatrix.key').toString();
var httpsCert = fs.readFileSync('./config/myappmatrix.crt').toString();
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
	hostnameOnly : true,
	router : {
		'www.myappmatrix.com' : '127.0.0.1:443',
		'app.myappmatrix.com' : '127.0.0.1:8080',
		'api.myappmatrix.com' : '127.0.0.1:3000',
		'pusher.myappmatrix.com' : '127.0.0.1:3002'
	}
};



/* ======================[ @TODO: Dynamic REST API ]====================== */
var rest = require('./routes/rest').rest;
	rest.init(3000);



var smartpass = require('./routes/smartpass').smartpass;
	smartpass.init(3535);




//test push
var amePusher = require('./routes/ame-pusher');
	amePusher.AppMatrixPusher.initServer(3434);
	
	//init the server

	amePusher.AppMatrixPusher.init({
		live : false,
		cert : './files/Aps/com_myappmatrix_app_dev_cert.pem',
		key : './files/Aps/com_myappmatrix_app_dev_key.pem',
		passphrase : 'fred'
	}); 
 
	//send test push
	amePusher.AppMatrixPusher.send('eb52b4ec270ae7460b54100281626668ca1362cdb4df24cd4093b4b15e46cfed', 'rich', 'ame server booted!', 0, {url: 'http://myappmatrix.com'});





/* @TODO: Proxy Server */
proxyServer = httpProxy.createServer(options, function (req, res, proxy) {
	// console.log('proxyServer', options);
	if (req.url.match(/^\/api\//)) {
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : 3000
		});
		console.log('Routing request: API server'.warn);
		//Match v1 api calls
	} else if (req.url.match(/^\/v1\//)) {
		proxy.proxyRequest(req, res, {
			host : 'www.myappmatrix.com',
			port : 443
		});
		console.log('Routing request: v1 API server'.warn);
		
		
		
		//Match pusher server calls
	} else if (req.url.match(/^\/aps\//)) {
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : 3434
		});
		console.log('Routing request: Pusher Server'.warn);
		
		
		
		//Custom server with yeoman and socketio
	} else if (req.url.match(/^\/smartpass\//)) {
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : 3535
		});
		console.log('Routing request: Passbook Server'.warn);
		//Match any /public dir and route to apache
	} else if (req.url.match(/^\/public\//)) {
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
			port : 3000
		});
		console.log('Routing request: App Server'.warn);
	}
});
httpsServer = https.createServer(options, function (req, res) {
	res.writeHead(200, {
		'Content-type' : 'text/plain'
	});
	res.write('Request proxied ' + JSON.stringify(req.headers));
	res.end();
}).listen(8081);
////////////////////////////
//## Socket Server
//This is a socket server implementation for "real" time analytics and other data.
//This is for use with geo analytics and other backend data from the app. listen for connected clients
//
// ### Server Channels
//These are the events that this socket server dispatches.
//
//1. ame:authorization
//2. ame:client:message
//3. ame:client:connect
//4. ame:client:disconnect
//5. ame:server:message
//6. ame:server:disconnect
//7. ame:server:connect
//8. ame:
//
//sio = require('socket.io'),
var AmeSocketServer = {
	
	//###init(app)
	//I setup the socket server and listen for any routing requests from the express app.
	init : function (app) {
		var io = sio.listen(app);
		io.configure(function () {
			io.set('authorization', function (handshakeData, callback) {
				if (handshakeData.xdomain) {
					callback('Cross-domain connections are not allowed');
				} else {
					callback(null, true);
				}
			});
		});
		
		
		//Hold the names of events that this socket server listens for and emits
		var AmeSocket = {
			events : {
				session : {
					pageView : 'ame:session:pageView',
					hashChange : 'ame:session:hashChange',
					login: 'ame:session:login',
					logout: 'ame:session:logout'
				},
				server : {
					message : 'ame:server:message',
					connected : 'ame:server:connect',
					disconnected : 'ame:server:disconnect'
				},
				client : {
					message : 'ame:client:message',
					connected : 'ame:client:connect',
					disconnected : 'ame:client:disconnect'
				}
			}
		};
		
		
		//Store a list of the connected clients
		var connections = [];
		
		
		
		
		//Handle when a client is connected.
		io.sockets.on('connection', function (socket) {
			
			
			
			
			
			//push to connections array
			connections.push(socket);
			
		 	
			//Publish the server connected event
			io.sockets.emit(AmeSocket.events.server.connected, {
				data : connections.length
			});
			
			
			//Listen for client connected
			socket.on(AmeSocket.events.client.connected, function (msg) {
				console.log(AmeSocket.events.client.connected, msg);
			});
			
			
			//Listen for any messages from the client
			socket.on(AmeSocket.events.client.message, function (content) {
				
				console.log(AmeSocket.events.client.message, JSON.stringify(content).debug);
				
				//Broadcast the event 
				socket.emit(AmeSocket.events.server.message, {
					id : socket.id,
					data : content
				});
				socket.broadcast.emit(AmeSocket.events.server.message, {
					id : socket.id,
					data : content
				});
			});
			
			
			
			//Listen for any pageView events from the client
			socket.on(AmeSocket.events.session.pageView, function (message) {
				console.log(AmeSocket.events.session.pageView + message);
				
				ip = socket.handshake.address.address;
				url = message;
				
				//Broadcast the event
				io.sockets.emit(AmeSocket.events.session.pageView, {
					'connections' : Object.keys(io.connected).length,
					'ip' : ip,
					'url' : url,
					'xdomain' : socket.handshake.xdomain,
					'timestamp' : new Date ()
				});
			});
			
			
			
			
			//handle disconnections
			socket.on('disconnect', function () {
				console.log("Socket disconnected");
				
				io.sockets.emit('ame:session:pageview', {
					'connections' : Object.keys(io.connected).length
				});
				
			});
			
			
			
			
		
			
			
			
		});
	}
};


//Start the websocket server
AmeSocketServer.init(proxyServer);

//Start the proxy server
proxyServer.listen(8080);
//Test insert
//curl -d '{ "name" : "This is a name" }' -H "Content-Type: application/json" http://dev.appmatrix.us:3000/myappmatrix/posts
/* @TODO: Live REST */
/* @TODO: Devices
 var devices = require('./routes/api/devices');
 app.get('/myappmatrix/devices', devices.Resource.findAll);
 app.post('/myappmatrix/devices', devices.Resource.add);
 app.put('/myappmatrix/devices/:id', devices.Resource.update);
 app.get('/myappmatrix/devices/:id', devices.Resource.findById);
 app.post('/myappmatrix/devices/:id', devices.Resource.destroy);
 */
/* @TODO: Analytics
 var analytics = require('./routes/api/analytics');
 app.get('/myappmatrix/analytics', analytics.Resource.findAll);
 app.post('/myappmatrix/analytics', analytics.Resource.add);
 app.put('/myappmatrix/analytics/:id', analytics.Resource.update);
 app.get('/myappmatrix/analytics/:id', analytics.Resource.findById);
 app.post('/myappmatrix/analytics/:id', analytics.Resource.destroy);
 */
