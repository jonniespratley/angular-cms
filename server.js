/**
 * Server - This is the Node.js Server.
 * @object
 */
var fs = require('fs'),
	util = require('util'),
	httpProxy = require('http-proxy'),
	colors = require('colors');

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

/**
 * @TODO - HTTPS Key and Cert
 *
 * This is the location of your https cert and key.
 */
var httpsKey = fs.readFileSync('./config/apache.key').toString();
var httpsCert = fs.readFileSync('./config/apache.crt').toString();

/**
 * @TODO - Proxy Options
 * This object holds options used for creating a proxy server.
 */
var options = {
	port: null,
	host: {
		hostname: 'localhost',
		port: 8181
	},
	proxy: {
		hostname: 'localhost',
		port: 5001
	},
	api: {
		hostname: 'localhost',
		port: 5151
	},
	key: httpsKey,
	cert: httpsCert,
	hostncmsOnly: true,
	router: {}
};
/**
 * @TODO - Externalize configuration for server and proxy, mongodb
 */
var config = JSON.parse(fs.readFileSync('./config/config.json'));
var cmsAuth = require('./routes/cms-auth');
var cmsRest = require('./routes/rest');

var rest = new cmsRest(config);
var auth = new cmsAuth(config, rest);

var webapp = auth.listen(config.port || process.env.PORT, function () {
	console.log(String('Node.js REST server listening on port: ' + config.port).verbose);
});


//Socket server
var socket = require('./routes/socketserver').SocketServer;

//Initialize socket server and rest server
socket.init(webapp);





//Create proxy server and proxy requests
proxyServer = httpProxy.createServer(options, function (req, res, proxy) {

	console.log('Proxy server started on port: ' + options.host.port);

	// console.log('proxyServer', options);
	if (req.url.match(/^\/api\//)) {
		proxy.proxyRequest(req, res, {
			host: '127.0.0.1',
			port: options.api.port
		});
		console.log('Routing request: API server'.warn);

	} else if (req.url.match(/^\/1\//)) {

		/* Default express server */
		proxy.proxyRequest(req, res, {
			host: 'api.parse.com'
		});
		console.log('Routing request: Parse Server'.warn);

	} else {

		/* Default express server */
		proxy.proxyRequest(req, res, {
			host: '127.0.0.1',
			port: options.api.port
		});
		console.log('Routing request: App Server'.warn);
	}
});

//Start the proxy server
proxyServer.listen(options.port);
