var fs = require('fs'),
	util = require('util'),
	httpProxy = require('http-proxy');


module.exports = function (config, app) {
	console.warn( 'cms-proxy', 'initialized', config.proxy );

	/**
	* @TODO - HTTPS Key and Cert
	*
	* This is the location of your https cert and key.
	*/
	var httpsKey = fs.readFileSync(config.https.key).toString();
	var httpsCert = fs.readFileSync(config.https.cert).toString();


	/**
	* @TODO - Proxy Options
	* This object holds options used for creating a proxy server.
	*/
	var options = {
		port: 8080,
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

	//Create proxy server and proxy requests
	var proxyServer = httpProxy.createServer(options, function(req, res, proxy) {

		console.log('Proxy server started on port: ' + options.host.port);

		// console.log('proxyServer', options);
		if (req.url.match(/^\/api\//)) {
			proxy.proxyRequest(req, res, {
				host: '127.0.0.1',
				port: options.api.port
			});
			util.log('Routing request: API server'.warn);
		}
		else if (req.url.match(/^\/1\//)) {

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
	proxyServer.listen(config.proxy.port, function(){
		console.log('cms-proxy server listening on ', config.proxy.port);
	});
};
