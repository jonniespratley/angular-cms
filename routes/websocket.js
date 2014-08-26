/**
 * using WebSocket-Node
 *
 *  var ws = new WebSocket('ws://localhost:5050', 'echo-protocol');
 */
var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	WebSocketServer = require('websocket').server,
	WebSocketRouter = require('websocket').router;



function jsWebSocketServer(options){

	//Private API
	var _wsServer = null,
		_wsRouter = null,
		_httpServer = null,
		_options = options || {};


	//Public API
	return {
		/**
		 * Create new instance of socket if not already one.
		 * @returns {*}
		 */
		getInstance: function(){
			if(!_wsServer){
				_wsServer = new WebSocketServer();
				_wsServer.mount(_options);
			}
			return _wsServer;
		}
	}
};



/**
 * Create Server
 */
var server = http.createServer(function (req, res) {
	var urlParsed = url.parse(req.url, true, true);

	fs.readFile(urlParsed.path.split('/')[1], function (err, data) {
		if (err) {
			res.statusCode = 404;
			res.end(http.STATUS_CODES[404]);
		}
		res.statusCode = 200;
		res.end(data);
	});

}).listen(5050, function () {
	console.log('WebSocket on port 5050');
});





var serverConfig = {
	httpServer: server,
	autoAcceptConnections: false
};

/**
 * Create Socket Server
 * @type {WebSocketServer}
 */
var wsserver = jsWebSocketServer(serverConfig).getInstance();

var wsrouter = new WebSocketRouter();
	wsrouter.attachServer(wsserver);

/**
 * On Connect
 */
wsserver.on('connect', function (connection) {
	connection.send('WebSocketServer: Connected!');
	console.log('Connected to WebSocket Server!');
});
/**
 * On Close
 */
wsserver.on('close', function (connection, reason, description) {
	connection.send('WebSocketServer: Disconnected!');
	console.log('Disconnected to WebSocket Server!', reason, description);
});


wsrouter.mount('*', 'echo-protocol', function (request) {
	console.log('mounted to echo protocol');
	var conn = request.accept(request.origin);
	conn.on('message', function (message) {
		console.log('routed message');
	});
	conn.send('hey');
});
wsrouter.mount('*', 'update-protocol', function (request) {
	console.log('mounted to update protocol');
	var conn = request.accept(request.origin);
	conn.on('message', function (message) {
		console.log('update all the things');
	});
});


