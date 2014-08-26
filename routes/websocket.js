/**
 * using WebSocket-Node
 *
 *  var ws = new WebSocket('ws://localhost:5050', 'echo-protocol');
 */
var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	WebSocketServer = require('websocket').server;

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
var wsserver = new WebSocketServer();
wsserver.mount(serverConfig);

/**
 * On Connect
 */
wsserver.on('connect', function (connection) {
	console.log('connected');
	connection.send('yo');
});

/**
 * On Request
 */
wsserver.on('request', function (req) {
	console.log('request');
	var connection = req.accept('echo-protocol', req.origin);
	connection.on('message', function (message) {
		if (message.type === 'utf8') {
			console.log(message.utf8Data);
		}
		else if (message.type === 'binary') {
			console.log(message.binaryData);
		}
	});
	connection.on('close', function (reasonCode, description) {
		console.log('connection closed', reasonCode, description);
	});
});

/**
 * On Close
 */
wsserver.on('close', function (conn, reason, description) {
	console.log('closing', reason, description);
});
