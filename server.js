/**
 * Server - This is the Node.js Server.
 * @object
 */
var fs = require('fs'),
	util = require('util'),
	http = require('http'),
	express = require('express'),
	httpProxy = require('http-proxy'),
	colors = require('colors'),
	app = express();


	/**
	* @TODO - Externalize configuration for server and proxy, mongodb
	*/
	var config = JSON.parse(fs.readFileSync('./config/config.json'));


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




var cmsRoutes = require('./routes/cms-routes');

cmsRoutes.mount(config, app);

var webapp = http.createServer(app).listen(config.port || process.env.PORT, function () {
	util.log('App listening on port: ' + config.port + ''.verbose);
	util.log(util.inspect(config, {colors: true}));
});



//Create proxy server and proxy requests
proxyServer = httpProxy.createServer(options, function (req, res, proxy) {

	console.log('Proxy server started on port: ' + options.host.port);

	// console.log('proxyServer', options);
	if (req.url.match(/^\/api\//)) {
		proxy.proxyRequest(req, res, {
			host: '127.0.0.1',
			port: options.api.port
		});
		util.log('Routing request: API server'.warn);

	} else if (req.url.match(/^\/1\//)) {

		/* Default express server */
		proxy.proxyRequest(req, res, {
			host: 'api.parse.com'
		});
		util.log('Routing request: Parse Server'.warn);

	} else {

		/* Default express server */
		proxy.proxyRequest(req, res, {
			host: '127.0.0.1',
			port: options.api.port
		});
		util.log('Routing request: App Server'.warn);
	}
});


//Start the proxy server
proxyServer.listen(config.proxy.port);
