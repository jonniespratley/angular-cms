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

/*
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
*/

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
	port : null,
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
	port : 8181,
	version : 'v2',
	security : {
		salt : ''
	},
	db : {
		name : 'angular-cms',
		username : 'amadmin',
		password : 'fred',
		host : 'localhost',
		port : 27017
	},
	email: {
		username: 'angular.cms@gmail.com',
		password: 'isyourdaughter18?'
	},
	staticDir : __dirname + '/dist',
	publicDir : __dirname + '/app',
	uploadsTmpDir : __dirname + '/.tmp',
	uploadsDestDir : __dirname + '/www/cms-content/uploads',
	uploadsUrl: ':8181/cms-content/',
	logFormat : '[:date] - [:method] - :url - :status - :response-time ms'
};

//Start the reset server
var rest = require('./routes/rest').rest;
/*
var socket = require('./routes/socketserver').SocketServer;
    socket.init(rest.init(config));
*/

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

	} else if(req.url.match(/^\/1\//)) {

		/* Default express server */
		proxy.proxyRequest(req, res, {
			host : 'api.parse.com'
		});
		console.log('Routing request: Parse Server'.warn);

	} else {

		/* Default express server */
		proxy.proxyRequest(req, res, {
			host : '127.0.0.1',
			port : options.api.port
		});
		console.log('Routing request: App Server'.warn);
	}
});

//Start the proxy server
proxyServer.listen(options.port);


/**
 * Test Email
 */
var email   = require("emailjs");
var server  = email.server.connect({
   user:    config.email.username,
   password: config.email.password,
   host:    "smtp.gmail.com",
   ssl:     false
});

var message = {
   text:    "i hope this works",
   from:    "you <angular.cms@gmail.com>",
   to:      "jonniespratley <jonniespratley@gmail.com>",
   cc:      "angular.cms <angular.cms@gmail.com>",
   subject: "testing angular-cms emailjs",
   attachment:
   [
      {data:"<html>i <i>hope</i> this works!</html>", alternative:true}
     // {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
   ]
};

// send the message and get a callback with an error or details of the message that was sent
//server.send(message, function(err, message) { console.log(err || message); });

// you can continue to send more messages with successive calls to 'server.send',
// they will be queued on the same smtp connection

// or you can create a new server connection with 'email.server.connect'
// to asynchronously send individual emails instead of a queue


 /*
 * fs.readFile(req.files.displayImage.path, function (err, data) {
  // ...
  var newPath = __dirname + "/uploads/uploadedFileName";
  fs.writeFile(newPath, data, function (err) {
  res.redirect("back");
  });
  });*/
