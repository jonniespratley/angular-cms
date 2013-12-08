/**
 * Server - This is the Node.js Server.
 * @object
 */
var fs = require('fs'), 
	util = require('util'), 
	httpProxy = require('http-proxy');


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

console.log("this is an silly".silly);
console.log("this is an input".input);
console.log("this is an verbose".verbose);
console.log("this is an prompt".prompt);
console.log("this is an info".info);
console.log("this is an data".data);
console.log("this is an help".help);
console.log("this is an debug".debug);
console.log("this is an error".error);
console.log("this is a warning".warn);


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
	port:  null,
	host : {
		hostname : 'localhost',
		port : 8181,
	},
	proxy : {
		hostname : 'localhost',
		port : 5001
	},
	api : {
		hostname : 'localhost',
		port : 5151
	},
	key : httpsKey,
	cert : httpsCert,
	hostncmsOnly : true,
	router : {
	}
};

var config = {
	port:  8181,
	version : 'v2',
	security : {
		salt : ''
	},
	db : {
		username : 'amadmin',
		password : 'fred',
		host : 'localhost',
		port : 27017
	},
	staticDir : __dirname +'/dist',
	publicDir : __dirname + '/www',
	uploadsTmpDir : '.temp',
	uploadsDestDir : 'www/cms-content/uploads',
	logFormat : '[:date] - [:method] - :url - :status - :response-time ms'
};


//Start the reset server
var rest = require('./routes/rest').rest;
	rest.init(config);



//Create proxy server and proxy requests
proxyServer = httpProxy.createServer(options, function(req, res, proxy) {

	console.log('Proxy server started on port: ' + options.host.port);

	// console.log('proxyServer', options);
	if(req.url.match(/^\/api\//)) {
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : options.api.port
		});
		console.log('Routing request: API server'.warn);

	} else {
		/* Default express server */
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : options.host.port
		});

		console.log('Routing request: App Server'.warn);
	}
});


// print process.argv - check if any options match options
process.argv.forEach(function(val, index, array) {
	if(array[index] === options[array[index]]){
		options[array[index]] = val;
	}
	console.log(index + ': ' + val);
});

proxyServer.on('listening',function(){
    console.log('ok, server is running');
});


console.log(options);
//Start the proxy server
proxyServer.listen(options.port);



/*
HTTPS Server - will get prompted in browser if keys are not real.
var httpServer = null;
var httpsServer = null;
httpsServer = https.createServer(options, function(req, res) {
res.writeHead(200, {
'Content-type' : 'text/plain'
});
res.write('Request proxied ' + JSON.stringify(req.headers));
res.end();
}).listen(8282);
*/


