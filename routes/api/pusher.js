/**
 * @file pusher.js
 * @comment
 *
 * This is a Push notification server for AppMatrix Pusher built on node.js and node-apn
 http://localhost:3001/?badge=1&token=eb52b4ec270ae7460b54100281626668ca1362cdb4df24cd4093b4b15e46cfed&message=You%20have%20a%20new%20dispatch&m=dev&mode=register
 */
var mongo = require('mongodb');
var mongoose = require('mongoose');
var colors = require('colors');
var crypto = require('crypto');
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var path = require('path');
var fs = require('fs');
var http = require('http');
var apns = require('apn');
var url = require('url');
var qs = require('querystring');
var express = require('express');
var app = express();


/**
 * Custom php -> node methods
 */

var php = {
	dirname: function(f, ext){
		return path.dirname(f);
	},
	file_exists: function(f){
		return fs.existsSync(f);
	},
	file_get_contents: function(f){
		return fs.readFileSync(f, 'utf8');
	},
	realpath:function(path){
		return fs.realpathSync(path);
	},
	json_encode:function(obj){
		return JSON.stringify(obj);
	},
	json_decode:function(s){
		return JSON.parse(s);
	}
};






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


var RestResource = {
	useversion : 'v1',
	urls : {
		v1 : 'https://www.myappmatrix.com',
		v2 : '/api/v2/'
	},
	index : function (req, res, next) {
		res.json({
			message : 'AppMatrix REST API Server ' + RestResource.useversion
		});
	},
	get : function (req, res, next) {
		var query = req.query.query ? JSON.parse(req.query.query) : {};
		// Providing an id overwrites giving a query in the URL
		if (req.params.id) {
			query = {
				'_id' : new BSON.ObjectID (req.params.id)
			};
		}
		//Pass a appid param to get all records for that appid
		if (req.param('appid')) {
			query['appid'] = String(req.param('appid'));
		}
		var options = req.params.options || {};
		//Test array of legal query params
		var test = ['limit', 'sort', 'fields', 'skip', 'hint', 'explain', 'snapshot', 'timeout'];
		//loop and test
		for (o in req.query ) {
			if (test.indexOf(o) >= 0) {
				options[o] = req.query[o];
			}
		}
		//Log for interal usage
		console.log('query', query, 'options', options);
		//new database instance
		var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
			auto_reconnect : true,
			safe : true
		}));
		//open database
		db.open(function (err, db) {
			if (err) {
				console.log(err);
			} else {
				//prep collection
				db.collection(req.params.collection, function (err, collection) {
					//query
					collection.find(query, options, function (err, cursor) {
						cursor.toArray(function (err, docs) {
							if (err) {
								console.log(err);
							} else {
								var result = [];
								if (req.params.id) {
									if (docs.length > 0) {
										result = Resource.flavorize(null, docs[0], "out");
										res.header('Content-Type', 'application/json');
										res.jsonp(200, result);
									} else {
										res.jsonp(404, 'Not found');
										//res.send(404);
									}
								} else {
									docs.forEach(function (doc) {
										result.push(doc);
									});
									res.header('Content-Type', 'application/json');
									res.jsonp(200, result);
								}
								db.close();
							}
						});
					});
				});
			}
		});
	},
	add : function (req, res, next) {
		var data = req.body;
		if (data) {
			var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
				auto_reconnect : true,
				safe : true
			}));
			db.open(function (err, db) {
				if (err) {
					console.log(err);
				} else {
					db.collection(req.params.collection, function (err, collection) {
						collection.count(function (err, count) {
							console.log("There are " + count + " records.");
						});
					});
					var results = [];
					db.collection(req.params.collection, function (err, collection) {
						//Check if the posted data is an array, if it is, then loop and insert each document
						if (data.length) {
							//insert all docs
							for (var i = 0; i < data.length; i++) {
								var obj = data[i];
								console.log(obj);
								collection.insert(obj, function (err, docs) {
									results.push(obj);
								});
							}
							db.close();
							//	res.header('Location', '/'+req.params.db+'/'+req.params.collection+'/'+docs[0]._id.toHexString());
							res.header('Content-Type', 'application/json');
							res.jsonp(200, {
								results : results
							});
						} else {
							collection.insert(req.body, function (err, docs) {
								res.header('Location', '/' + req.params.db + '/' + req.params.collection + '/' + docs[0]._id.toHexString());
								res.header('Content-Type', 'application/json');
								res.send('{"ok":1}', 201);
								db.close();
							});
						}
					});
				}
			});
		} else {
			res.header('Content-Type', 'application/json');
			res.send('{"ok":0}', 200);
		}
	},
	edit : function (req, res, next) {
		var spec = {
			'_id' : new BSON.ObjectID (req.params.id)
		};
		var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
			'auto_reconnect' : true,
			'safe' : true
		}));
		db.open(function (err, db) {
			db.collection(req.params.collection, function (err, collection) {
				collection.update(spec, req.body, true, function (err, docs) {
					res.header('Location', '/' + req.params.db + '/' + req.params.collection + '/' + req.params.id);
					res.header('Content-Type', 'application/json');
					res.send('{"ok":1}');
					db.close();
					console.log('Location', '/' + req.params.db + '/' + req.params.collection + '/' + req.params.id);
				});
			});
		});
	},
	view : function (req, res, next) {
	},
	destroy : function (req, res, next) {
		var params = {
			_id : new BSON.ObjectID (req.params.id)
		};
		console.log('Delete by id ' + req.params.id);
		var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
			auto_reconnect : true,
			safe : true
		}));
		db.open(function (err, db) {
			db.collection(req.params.collection, function (err, collection) {
				console.log('found ', collection.collectionName, params);
				collection.remove(params, function (err, docs) {
					if (!err) {
						res.header('Content-Type', 'application/json');
						res.send('{"ok":1}');
						db.close();
					} else {
						console.log(err);
					}
				});
			});
		});
	}
};


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



/* ======================[ @TODO: Listen for Device registration token ]====================== */
//callback handler
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
	
	console.log('Devices', String(devices).debug);
	console.log('Params', String(req.params).debug);
	console.log('Query', req.query);
	
	
	
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
		passphrase : 'fred', /* A passphrase for the Key file */
		ca : './files/Aps/entrust_ssl_ca.cer', /* String or Buffer of CA data to use for the TLS connection */
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
	devices : [
		'54563ea0fa550571c6ea228880c8c2c1e65914aa67489c38592838b8bfafba2a', 
		'd46ba7d730f8536209e589a3abe205b055d66d8a52642fd566ee454d0363d3f3'
	],
	apnsConnection : null,
	init : function (options) {
		this.apnsConnection = new apns.Connection (AmPusher.options);
	},
	feedback : {},
	initFeedback : function (appid) {
		var options = {
			cert : './files/Aps/' + appid + '_cert.p12', /* Certificate file */
			certData : null, /* Certificate file contents (String|Buffer) */
			key : './files/Aps/' + appid + '_key.p12', /* Key file */
			keyData : null, /* Key file contents (String|Buffer) */
			passphrase : 'fred', /* A passphrase for the Key file */
			ca : './files/Aps/entrust_ssl_ca.cer', /* Certificate authority data to pass to the TLS connection */
			pfx : null, /* File path for private key, certificate and CA certs in PFX or PKCS12 format. If supplied will be used instead of certificate and key above */
			pfxData : null, /* PFX or PKCS12 format data containing the private key, certificate and CA certs. If supplied will be used instead of loading from disk. */
			// address: 'feedback.push.apple.com', /* feedback address */
			address : 'feedback.push.apple.com',
			port : 2196, /* feedback port */
			feedback : this.feedbackHandler, /* enable feedback service, set to callback */
			batchFeedback : true, /* if feedback should be called once per connection. */
			interval : 60,
			error:function(e){
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
		
		
			
		//Check if the pem exists
		console.log('-------------APS-PEM', pemCheck);
		console.log( '------------APS-Notifications', note);
		console.log( '------------APS-Sent', sent);
		console.log('-------------Token', token);
		console.log('-------------Pem', pem);
		
		
		
		//Set the file location for the pem
		AmPusher.options.cert = './files/Aps/' + pem + '_cert.pem';
		AmPusher.options.key = './files/Aps/' + pem + '_key.pem';
		
		
		var pemCheck = php.file_exists(php.realpath(AmPusher.options.cert));
		
		
		
		
		//if the app is live, change the gateway
		if (live === 'true') {
			
			AmPusher.options.gateway = 'gateway.push.apple.com';
		}
		
		//create a new aps connect
		this.apnsConnection = new apns.Connection (AmPusher.options);
		
		
		//start the feedback service
		//this.initFeedback(pem);
		
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
