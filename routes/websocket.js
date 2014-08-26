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

var SocketServer = {
	instance: null,
	getInstance: function () {

	}
};


/**
 * Create Socket Server
 * @type {WebSocketServer}
 */
var wsserver = new WebSocketServer();
wsserver.mount(serverConfig);

/**
 * On Connect
 */
wsserver.on('connect', function (connection) {
	console.log('connected');
	connection.send('yo');
});

var router = new WebSocketRouter();
router.attachServer(wsserver);
router.mount('*', 'echo-protocol', function (request) {
	console.log('mounted to echo protocol');
	var conn = request.accept(request.origin);
	conn.on('message', function (message) {
		console.log('routed message');
	});
	conn.send('hey');
});
router.mount('*', 'update-protocol', function (request) {
	console.log('mounted to update protocol');
	var conn = request.accept(request.origin);
	conn.on('message', function (message) {
		console.log('update all the things');
	});
});


/**
 * On Close
 */
wsserver.on('close', function (conn, reason, description) {
	console.log('closing', reason, description);
});
