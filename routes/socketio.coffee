http = require 'http'
io = require 'socket.io'
fs = require 'fs'

#html page
socketFile = fs.readFileSync('socketio.html')

#Create server
server = http.createServer()
server.on('request', (req, res) ->
	res.writeHead('200', {'content-type': 'text/html'})
	res.end(socketFile)
)

#Start the server
server.listen(9090)

#Create socket
socket = io.listen(server)
socket.on('connection', (client) ->
	console.log('Client connected')
	client.send("Welcome #{client.sessionId}")
)