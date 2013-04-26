//#AME Pusher
//This is the server side module for handling push notifications and other things like creating certificates, generating pems, etc.

//## Dependencies
//Import all of the required modules.
var apn = require('apn'), _ = require('underscore'), path = require('path'), fs = require('fs'), http = require('http'), url = require('url'), qs = require('querystring'), express = require('express'), app = express();
var php = {
	dirname : function(f, ext) {
		return path.dirname(f);
	},
	file_exists : function(f) {
		return fs.existsSync(f);
	},
	file_get_contents : function(f) {
		return fs.readFileSync(f, 'utf8');
	},
	realpath : function(path) {
		return fs.realpathSync(path);
	},
	json_encode : function(obj) {
		return JSON.stringify(obj);
	},
	json_decode : function(s) {
		return JSON.parse(s);
	}
};

//## Configuration
//I am a configuration object to hold settings for the server.
var config = {
	name : 'amepusher',
	message : 'AppMatrix Engine Push Server',
	version : 'v2',
	security : {
		salt : 'a58e325c6df628d07a18b673a3420986'
	},
	db : {
		username : 'amadmin',
		password : 'fred',
		host : 'localhost',
		port : 27017
	},
	staticDir : './app',
	publicDir : __dirname + '/app',
	uploadsTmpDir : 'temp',
	uploadsDestDir : 'files',
	logFormat : '[:date] - [:method] - :url - :status - :response-time ms'
};

//## Express
//I handle configuration on the express server.
app.configure(function() {
	app.use(express.logger('dev'));
	app.use("jsonp callback", true);
	app.use(express.bodyParser({
		keepExtensions : true,
		uploadDir : config.uploadsDestDir
	}));
	app.use(function(err, req, res, next) {
		//console.error(err.stack);
		res.send(500, 'Something broke!');
	});
	app.use(function(req, res, next) {
		console.log('%s %s', req.method, req.url);
		next();
	});
});

//## Pusher
//I am the AppMatrix Engine v2 Pusher object that sends push notifications and handles feedback.
//
//#### Usage
//`amePusher.AppMatrixPusher.send('eb52b4ec270ae7460b54100281626668ca1362cdb4df24cd4093b4b15e46cfed', 'rich', 'APNS Push Message', 0, {url: 'http://google.com'});`
//
//#### API Routes are as follows.
//`http://localhost:8080/aps/v1/pusher/push -> php push`
//`http://localhost:8080/aps/v2/pusher/push -> node push`
var AppMatrixPusher = {
	server : app,
	apnsFeedback : null,
	apnsConnection : null,
	apnsDevice : null,
	apnsToken : 'eb52b4ec270ae7460b54100281626668ca1362cdb4df24cd4093b4b15e46cfed',
	apnsNote : null,
	debug : true,
	log : function(args) {
		if (this.debug) {
			console.log(args);
		}
	},

	//###defaults
	//I am the default options for setting up the push notification server.
	defaults : {
		live : false,
		server : {
			port : 3434
		},
		gateway : 'gateway.sandbox.push.apple.com',
		port : 2195,
		cert : './files/Aps/com_myappmatrix_app_dev_cert.pem',
		key : './files/Aps/com_myappmatrix_app_dev_key.pem',
		passphrase : 'fred',
		enhanced : true,
		cacheLength : 100,
		transmitted : this.transmittedHandler,
		connected : this.connectedHandler,
		disconnected : this.disconnectedHandler,
		error : this.errorHandler
	},

	//###init()
	//I setup the initial connection with any options merged with the defaults
	init : function(options, port) {
		if (port) {
			this.initServer(port);
		}
		if (options.live) {
			this.defaults.gateway = 'gateway.push.apple.com';
		}

		if (options.appid) {
		}

		this.defaults = _.extend(this.defaults, options);
		this.checkPems(options.appid, options.live);
		this.apnsConnection = new apn.Connection(this.defaults);
		this.apnsConnection.on('connected', this.connectedHandler);
		this.apnsConnection.on('disconnected', this.disconnectedHandler);
		this.apnsConnection.on('socketError', this.errorHandler);
		this.apnsConnection.on('transmissionError', this.errorHandler);

		this.initFeedback(this.defaults);
	},

	//###initServer(port)
	//I setup the express push server to listen for incoming requests.
	initServer : function(port) {
		if (port) {
			this.server.listen(port);
		}
	},

	//### send()
	//I send a push notification to a device.
	send : function(token, type, message, badge, payload, successCb, errorCb) {
		var _tokens = token.split(',');

		if (!type) {
			type = 'basic';
		}
		if (!badge) {
			badge = 0;
		}
		if (successCb && errorCb) {
			this.apnsConnection.on('transmitted', successCb);
			this.apnsConnection.on('error', errorCb);
		} else {
			this.apnsConnection.on('transmitted', this.transmittedHandler);
			this.apnsConnection.on('error', this.errorHandler);
		}

		//Loop each token and push to it
		for (var i = 0; i < _tokens.length; i++) {
			this.log('ame-pusher - sending push #' + i, _tokens[i]);

			this.apnsDevice = new apn.Device(_tokens[i]);
			this.apnsNote = new apn.Notification();
			this.apnsNote.device = this.apnsDevice;
			this.apnsNote.expiry = Math.floor(Date.now() / 1000) + 3600;
			this.apnsNote.badge = badge;
			this.apnsNote.alert = message;
			this.apnsNote.sound = 'default';
			this.apnsNote.payload = _.extend({
				'type' : type
			}, payload);
			this.apnsConnection.sendNotification(this.apnsNote);
		};

	},

	//###batchSend()
	//I send a push to many devices.
	batchSend : function(tokens, args) {
		var _tokens = token.split(',');
		for (var i = 0; i < _tokens.length; i++) {
			this.send(_tokens[i], args.type, args.message, args.badge, args.payload);
		};
	},

	//###initFeedback()
	//I setup the feedback service with the passed options.
	initFeedback : function(options) {
		var self = this;
		if (options.live) {
			options.address = 'feedback.push.apple.com';
		}
		var defaults = {
			cert : 'cert.pem', /* Certificate file */
			key : 'key.pem', /* Key file */
			passphrase : null, /* A passphrase for the Key file */
			address : 'feedback.sandbox.apple.com', /* feedback address */
			feedback : self.feedbackHandler,
			port : 2196, /* feedback port */
			batchFeedback : true, /* if feedback should be called once per connection. */
			interval : 300 /* interval in seconds to connect to feedback service */
		};

		self.apnsFeedback = new apn.Feedback(_.extend(defaults, options));

	},

	//### checkPems(appid, cb)
	//I am a utility method that checks if the appid pem files are in the /files/Aps/ folder, since we use a naming convention to create the pems
	//we can check to see if they exist.
	checkPems : function(appid, live, cb) {
		var _appid = String(appid).replace(/\./g, '_'), _type = '_dev_', _key = null, _cert = null, _certFilename = null, _keyFilename = null, _apsFolder = null;
		if (live) {
			_type = '_pro_';
		}

		//Build the cert filename
		_certFilename = _appid + _type + 'cert.pem';
		_keyFilename = _appid + _type + 'key.pem';
		_apsFolder = './files/Aps/';
		_cert = _apsFolder + _certFilename;
		_key = _apsFolder + _keyFilename;

		if (php.file_exists(_cert) && php.file_exists(_key)) {
			
			console.log('Found! - ', _cert, _key);
			
			this.defaults.cert = _cert;
			this.defaults.key = _key;
			this.apnsConnection = new apn.Connection(this.defaults);
		} else {
			console.log('Not Found!', _cert, _key);
		}

		if (cb) {
			cb({
				cert : _cert,
				key : _key
			});
		}

		return {
			cert : _cert,
			key : _key
		};
	},

	uploadPems : function(req, res) {

		var appid = req.param('appid');
		var passphrase = req.param('passphrase');

		//Handle if dynamic filenames are enabled
		var tmp_path = req.files.file.path;
		var tmp_filename = req.files.file.name;
		var filename = tmp_filename;
		var target_dir = config.uploadsDestDir + '/' + 'Aps' + '/';
		var target_path = config.uploadsDestDir + '/' + 'Aps' + '/' + filename;
		var target_filename = String(appid).replace(/\./g, '_') + '_cert';

		console.log(String('Target Path: ' + target_path));
		console.log(String('Target Dir: ' + target_dir));
		console.log(String('Temp Filename: ' + tmp_filename));
		console.log(String('Temp Path: ' + tmp_path));

		//build the response object
		var json = {
			status : true,
			filename : filename,
			msg : 'File Uploaded',
			results : req.files,
			appid : appid
		};
		res.json(json);
	},

	//###feedbackHandler()
	//I handle the feedback response from the APNS server.
	feedbackHandler : function(devices) {
		devices.forEach(function(item) {
			// Do something with item.device and item.time;
			console.log('device - ' + item.device, 'time - ' + item.time);

		});

	},

	//###errorHandler()
	//I handle any errors from the aps connect.
	errorHandler : function(e) {
		console.log('errorHandler', e);
	},

	//###transmittedHandler()
	//I handle any transmitted events from the aps connect.
	transmittedHandler : function(e) {
		console.log('transmittedHandler', e);
	},

	//###connectedHandler()
	//I handle any connection events from the aps connect.
	connectedHandler : function(e) {
		console.log('connectedHandler', e);
	},

	//###disconnectedHandler()
	//I handle any disconnected events from the aps connect.
	disconnectedHandler : function(e) {
		console.log('disconnectedHandler', e);
	},

	//###test()
	//I send a test push notification to a device.
	test : function(token) {
		this.send(token, 'basic', 'Test Push v2', 0);
	}
};

/**
 app.get('/aps/' + config.version + '/:db/:collection/:id?', RestResource.get);
 app.post('/aps/' + config.version + '/:db/:collection', RestResource.add);
 app.put('/aps/' + config.version + '/:db/:collection/:id', RestResource.edit);
 app.delete('/aps/' + config.version + '/:db/:collection/:id', RestResource.destroy);
 */

app.post('/aps/' + config.version + '/' + config.name + '/' + 'upload', AppMatrixPusher.uploadPems);

//##Available routes
//* POST - /aps/v2/pusher/push - Send push notification
//* GET - /aps/v2/pusher/devices - Get all devices
//* GET - /aps/v2/pusher/fences - Get all geo fences
//### /aps
//`http://localhost:8080/aps`
app.get('/aps', function(req, res) {
	res.jsonp({
		message : config.message
	});
});

//### /aps/v1
//`http://localhost:8080/aps/v1`
app.get('/aps/' + config.version, function(req, res) {
	res.jsonp({
		message : config.message
	});
});

//### /aps/v1/amepusher
//`http://localhost:8080/aps/v1/amepusher`
app.get('/aps/' + config.version + '/' + config.name, function(req, res) {
	res.jsonp({
		message : config.message
	});
});

//### /aps/v2/amepusher/push
// *Request Url: http://localhost:8080/aps/v2/amepusher/push
// *Request Method: GET
app.get('/aps/' + config.version + '/' + config.name + '/' + 'push', function(req, res) {

	AppMatrixPusher.init({
		live : req.param('live'),
		appid : req.param('appid'),
		cert : req.param('cert'),
		key : req.param('key'),
		passphrase : req.param('passphrase')
	});
	AppMatrixPusher.send(req.param('tokens'), req.param('type'), req.param('alert'), req.param('badge'), {
		url : 'http://google.com'
	}, function(results) {
		res.jsonp({
			status : true,
			message : 'Your message has been sent to Apple APNS.',
			results : results
		});
	}, function(error) {
		res.jsonp({
			status : false,
			message : 'There is a problem sending your push notification.',
			results : error
		});

	});

});

//### /aps/v2/amepusher/push
//I handle taking the post request and sending a push notification.
//`http://localhost:8080/aps/v2/amepusher/push`
//#### POST
//``
app.post('/aps/' + config.version + '/' + config.name + '/' + 'push', function(req, res) {
	var params = req.params;
	console.log('/aps/v2/amepusher/push', params);
	//init the server
	AppMatrixPusher.init({
		live : false,
		cert : req.param('cert'),
		key : req.param('key'),
		passphrase : req.param('passphrase')
	});
	//send test push
	AppMatrixPusher.send(req.param('tokens'), req.param('type'), req.param('alert'), req.param('badge'), {
		url : 'http://google.com'
	}, function(msg) {
		res.jsonp({
			results : msg
		});
	});
});

/**
 * **********************************
 * Android Push
 * http://developer.android.com/google/gcm/gs.html
 * **********************************
 */
function androidPush() {
	var gcm = require('node-gcm');
	var message = new gcm.Message();
	var sender = new gcm.Sender('insert Google Server API Key here');
	var registrationIds = [];
	message.addData('key1', 'message1');
	message.collapseKey = 'demo';
	message.delayWhileIdle = true;
	message.timeToLive = 3;
	registrationIds.push('regId1');
	registrationIds.push('regId2');
	sender.send(message, registrationIds, 4, function(err, result) {
		console.log(result);
	});
	sender.sendNoRetry(message, registrationIds - array, function(err, result) {
		console.log(result);
	});
}

exports.AppMatrixPusher = AppMatrixPusher;
