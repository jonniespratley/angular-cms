app.configure(function () {
	app.use(express.logger('dev'));
	app.use("jsonp callback", true);
	app.use(express.bodyParser());
	app.use(function (err, req, res, next) {
		//console.error(err.stack);
		res.send(500, 'Something broke!');
	});
	// simple logger
	app.use(function (req, res, next) {
		//console.log('%s %s', req.method, req.url);
		next();
	});
});
var onError = function (error, note) {
	console.log('Error is: %s', error);
};
/**
 * Configuration Object to hold
 */
var config = {
	name : 'pusher',
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
	}
};
/**
 * Default route.
 *
 *
 * Available routes
 *
 * POST - /aps/v2/pusher/push - Send push notification
 * GET - /aps/v2/pusher/devices - Get all devices
 * GET - /aps/v2/pusher/fences - Get all geo fences
 *
 * http://localhost:3001/aps/v2/pusher/notifications - List all notifications that have been added
 *
 * http://localhost:3001/aps/v2/pusher/devices - List all devices that have been added
 *
 app.get('/aps/' + config.version + '/:db/:collection/:id?', RestResource.get);
 app.post('/aps/' + config.version + '/:db/:collection', RestResource.add);
 app.put('/aps/' + config.version + '/:db/:collection/:id', RestResource.edit);
 app.delete('/aps/' + config.version + '/:db/:collection/:id', RestResource.destroy);
 */
app.get('/aps', function (req, res) {
	res.jsonp({
		message : config.message
	});
});
app.get('/aps/' + config.version, function (req, res) {
	res.jsonp({
		message : config.message
	});
});
app.get('/aps/' + config.version + '/' + config.name, function (req, res) {
	res.jsonp({
		message : config.message
	});
});
/*
 * Register device
 * http://localhost:8080/aps/v2/register/1234
 */
app.get('/aps/' + config.version + '/' + config.name + '/devices/register/:token', function (req, res) {
	res.jsonp({
		message : 'Thanks for registering your device.',
		token : req.param('token')
	});
	console.log('Register device ' + req.param('token'));
});
/**
 * Send push to the provided token.
 *
 * http://localhost:3001/aps/v2/pusher/push/817107274570316ded0cca97559ea1c6e89b72b257d0a72fa4bef66324d80685
 * ?alert=Welcome%20to%20the%20%0AAppMatrix%20Engine
 * &app=Dublin%20Toyota
 * &appid=com.appmatrixinc.dublintoyota
 * &cert=%2Fhome%2Fjonnie%2Fmy.appmatrixinc.com%2Fapp%2Fwebroot%2Ffiles%2FAps%2Fcom_appmatrixinc_dublintoyota_pro_cert.p12
 * &device=%5B%22bab70cf3661e6e7184b7beaf8b930575130407006f2718ee4e9dd67e0e8b4546%22%2C%2260aebdfa0606b62813cb89581a27b4e3cd6611d45344a77f332c773ddbe48cce%22%5D
 * &devices=60aebdfa0606b62813cb89581a27b4e3cd6611d45344a77f332c773ddbe48cce
 * &key=%2Fhome%2Fjonnie%2Fmy.appmatrixinc.com%2Fapp%2Fwebroot%2Ffiles%2FAps%2Fcom_appmatrixinc_dublintoyota_pro_key.p12
 * &live=true
 * &passphrase=fred
 * &pem=com_appmatrixinc_dublintoyota_pro.pem
 * &pem_dev=com_appmatrixinc_dublintoyota_dev.pem
 * &pem_pro=com_appmatrixinc_dublintoyota_pro.pem
 * &target=one
 * &type=basic
 *
 * Query { alert: 'Welcome to the \nAppMatrix Engine',
 app: 'Dublin Toyota',
 appid: 'com.appmatrixinc.dublintoyota',
 cert: '/home/jonnie/my.appmatrixinc.com/app/webroot/files/Aps/com_appmatrixinc_dublintoyota_pro_cert.p12',
 device: '["bab70cf3661e6e7184b7beaf8b930575130407006f2718ee4e9dd67e0e8b4546","60aebdfa0606b62813cb89581a27b4e3cd6611d45344a77f332c773ddbe48cce"]',
 devices: '60aebdfa0606b62813cb89581a27b4e3cd6611d45344a77f332c773ddbe48cce,60aebdfa0606b62813cb89581a27b4e3cd6611d45344a77f332c773ddbe48cce',
 key: '/home/jonnie/my.appmatrixinc.com/app/webroot/files/Aps/com_appmatrixinc_dublintoyota_pro_key.p12',
 live: 'true',
 passphrase: 'fred',
 pem: 'com_appmatrixinc_dublintoyota_pro.pem',
 pem_dev: 'com_appmatrixinc_dublintoyota_dev.pem',
 pem_pro: 'com_appmatrixinc_dublintoyota_pro.pem',
 target: 'one',
 type: 'basic' }
 */
app.get('/aps/' + config.version + '/' + config.name + '/push/:token?', function (req, res) {
	var alert = req.param('alert');
	var sound = 'default';
	var pem = req.param('pem');
	var badge = 0;
	var token = req.param('token');
	var live = req.param('live');
	var results = [];
	//If the req.query.devices, split the string and loop each device sending a push.
	var devices = String(req.query.devices).split(',');
	for (var i = 0; i < devices.length; i++) {
		//Make the actual call to send the push
		AmPusher.sendPush(live, pem, devices[i], alert, badge, sound, function (data) {
			results.push({
				message : 'Sent push to ' + devices[i]
			});
		});
	};
	res.jsonp({
		results : results
	});
	console.log('Devices', String(devices).debug);
	console.log('Params', String(req.params).debug);
	console.log('Query', req.query);
});
/**
 * AmPusher - I am the pusher object that handles sending a push notification to a iOS device.
 * @file /WWW/AppMatrixEngine/ame-angular/routes/api/pusher.js
 * @object
 */
var AmPusher = {
	options : {
		cert : 'cert.pem', /* Certificate file path */
		certData : null, /* String or Buffer containing certificate data, if supplied uses this instead of cert file path */
		key : 'key.pem', /* Key file path */
		keyData : null, /* String or Buffer containing key data, as certData */
		passphrase : null, /* A passphrase for the Key file */
		ca : null, /* String or Buffer of CA data to use for the TLS connection */
		pfx : null, /* File path for private key, certificate and CA certs in PFX or PKCS12 format. If supplied will be used instead of certificate and key above */
		pfxData : null, /* PFX or PKCS12 format data containing the private key, certificate and CA certs. If supplied will be used instead of loading from disk. */
		//gateway: 'gateway.push.apple.com',/* gateway address */
		gateway : 'gateway.sandbox.push.apple.com', /* gateway address */
		port : 2195, /* gateway port */
		rejectUnauthorized : true, /* Value of rejectUnauthorized property to be passed through to tls.connect() */
		enhanced : true, /* enable enhanced format */
		errorCallback : onError, /* Callback when error occurs function(err,notification) */
		cacheLength : 100, /* Number of notifications to cache for error purposes */
		autoAdjustCache : true, /* Whether the cache should grow in response to messages being lost after errors. */
		connectionTimeout : 0 /* The duration the socket should stay alive with no activity in milliseconds. 0 = Disabled. */
	},
	devices : ['54563ea0fa550571c6ea228880c8c2c1e65914aa67489c38592838b8bfafba2a', 'd46ba7d730f8536209e589a3abe205b055d66d8a52642fd566ee454d0363d3f3'],
	apnsConnection : null,
	init : function (options) {
		this.apnsConnection = new apns.Connection (AmPusher.options);
	},
	feedback : {},
	initFeedback : function (appid) {
		var options = {
			cert : './files/Aps/' + appid + '.pem', /* Certificate file */
			certData : null, /* Certificate file contents (String|Buffer) */
			key : './files/Aps/' + appid + '_key.p12', /* Key file */
			keyData : null, /* Key file contents (String|Buffer) */
			passphrase : 'fred', /* A passphrase for the Key file */
			ca : null, /* Certificate authority data to pass to the TLS connection */
			pfx : null, /* File path for private key, certificate and CA certs in PFX or PKCS12 format. If supplied will be used instead of certificate and key above */
			pfxData : null, /* PFX or PKCS12 format data containing the private key, certificate and CA certs. If supplied will be used instead of loading from disk. */
			// address: 'feedback.push.apple.com', /* feedback address */
			address : 'feedback.push.apple.com',
			port : 2196, /* feedback port */
			feedback : this.feedbackHandler, /* enable feedback service, set to callback */
			batchFeedback : true, /* if feedback should be called once per connection. */
			interval : 60,
			error : function (e) {
				console.log('************'.error, e);
			}
		};
		var feedback = new apns.Feedback (options);
		this.feedback = feedback;
		console.log('--------------Feedback Service--------------', feedback);
	},
	feedbackHandler : function (time, buffer) {
		console.log('-----------feedback handler--------------', time, buffer);
	},
	/**
	 * I send a push notification to the device passed.
	 * @param {Object} live
	 * @param {Object} pem
	 * @param {Object} token
	 * @param {Object} alert
	 * @param {Object} badge
	 * @param {Object} sound
	 * @param {Object} cb
	 */
	sendPush : function (live, pem, token, alert, badge, sound, cb) {
		//Set the file location for the pem
		AmPusher.options.cert = './files/Aps/' + pem + '';
		var pemCheck = php.file_exists(php.realpath(AmPusher.options.cert));
		//if the app is live, change the gateway
		if (live === 'true') {
			AmPusher.options.gateway = 'gateway.push.apple.com';
		}
		//create a new aps connect
		this.apnsConnection = new apns.Connection (AmPusher.options);
		//start the feedback service
		this.initFeedback(pem);
		//create a new device
		var myDevice = new apns.Device (token);
		//create a new notification
		var note = new apns.Notification ();
		note.expiry = Math.floor(Date.now() / 1000) + 3600;
		note.alert = alert;
		note.device = myDevice;
		note.badge = badge;
		note.sound = sound;
		//send the notifications
		var sent = this.apnsConnection.sendNotification(note);
		//trigger the callback
		if (cb) {
			cb(note);
		}
		//Check if the pem exists
		console.log('-------------APS-PEM', pemCheck);
		console.log('------------APS-Notifications', note);
		console.log('------------APS-Sent', sent);
		console.log('-------------Token', token);
		console.log('-------------Pem', pem);
	}
};
//Export to public api
exports.pusher = {
	app : app,
	AmPusher : AmPusher,
	express : express,
	init : function (port) {
		//	app.listen(port);
		if (!port) {
			app.listen(3535);
		} else {
			app.listen(port);
		}
		AmPusher.init();
	}
};
