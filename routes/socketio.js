var fs, http, io, server, socket, socketFile;

http = require('http');

io = require('socket.io');

fs = require('fs');

socketFile = fs.readFileSync('socketio.html');

server = http.createServer();
server.on('request', function (req, res) {
	res.writeHead('200', {
		'content-type': 'text/html'
	});
	return res.end(socketFile);
});

server.listen(9090);

socket = io.listen(server);
clients = [];
socket.on('connection', function (client) {
	console.log('Client connected');
	clients.push(client);
	return client.send("Welcome " + client.id + " your the #"+clients.length + " client.");

});

/*
 //@ sourceMappingURL=socketio.js.map
 */