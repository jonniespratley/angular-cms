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
		name: 'angular-cms',
		username : 'amadmin',
		password : 'fred',
		host : 'localhost',
		port : 27017
	},
	staticDir : __dirname +'/app',
	publicDir : __dirname + '/app',
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
		
		
		
		/* ======================[ @TODO: 
		Need to put if v1 send to parse.com
		Host: api.parse.com/1/
		Content-Type: application/json
		X-Parse-Application-Id: fYHs4Flnj7vgVHm9vaFiFTSKt5Mj2Bxf9e93mTOB
		X-Parse-REST-API-Key: G9ALilrUgXH0F2XwFErB7MCWf3rt0xMgb8u2icpK
		
		URL	HTTP Verb	Functionality
		/1/classes/<className>	POST	Creating Objects
		/1/classes/<className>/<objectId>	GET	Retrieving Objects
		/1/classes/<className>/<objectId>	PUT	Updating Objects
		/1/classes/<className>	GET	Queries
		/1/classes/<className>/<objectId>	DELETE	Deleting Objects
		Users

		URL	HTTP Verb	Functionality
		/1/users	POST	Signing Up 
		Linking Users
		/1/login	GET	Logging In
		/1/users/<objectId>	GET	Retrieving Users
		/1/users/me	GET	Validating Session Tokens 
		Retrieving Current User
		/1/users/<objectId>	PUT	Updating Users 
		Linking Users 
		Verifying Emails
		/1/users	GET	Querying Users
		/1/users/<objectId>	DELETE	Deleting Users
		/1/requestPasswordReset	POST	Requesting A Password Reset
		Roles

		URL	HTTP Verb	Functionality
		/1/roles	POST	Creating Roles
		/1/roles/<objectId>	GET	Retrieving Roles
		/1/roles/<objectId>	PUT	Updating Roles
		/1/roles	GET	Querying Roles
		/1/roles/<objectId>	DELETE	Deleting Roles
		Files

		URL	HTTP Verb	Functionality
		/1/files/<fileName>	POST	Uploading Files
		Analytics

		URL	HTTP Verb	Functionality
		/1/events/AppOpened	POST	Analytics
		/1/events/<eventName>	POST	Custom Analytics
		Push Notifications

		URL	HTTP Verb	Functionality
		/1/push	POST	Push Notifications
		Installations

		URL	HTTP Verb	Functionality
		/1/installations	POST	Uploading Installation Data
		/1/installations/<objectId>	GET	Retrieving Installations
		/1/installations/<objectId>	PUT	Updating Installations
		/1/installations	GET	Querying Installations
		/1/installations/<objectId>	DELETE	Deleting Installations
		 ]====================== */

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


