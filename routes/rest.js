//# REST
// This is the resource object that contains all of the REST api methods for a full CRUD on a mongo account document.
//TODO Clean up this file
/**
 * @author Jonnie Spratley,
 * @created 10/23/12
 * REST METHODS:
 *
 * HTTP     METHOD          URL
 * ======|==============|==============================================
 * GET      findAll         http://localhost:3000/api/v2/database/table
 * GET      findById        http://localhost:3000/api/v2/database/table/:id
 * POST     add             http://localhost:3000/api/v2/database/table
 * PUT      update          http://localhost:3000/api/v2/database/table/:id
 * DELETE   destroy         http://localhost:3000/api/v2/database/table/:id
 */

//## Required Modules
var mongo = require('mongodb');
var mongoose = require('mongoose');
var crypto = require('crypto');
var Server = mongo.Server;
var path = require('path');
var Db = mongo.Db;
var BSON = mongo.BSONPure;
var express = require('express');
var fs = require('fs');
var app = express();
var request = require('request');
var upload = require('jquery-file-upload-middleware');
var easyimg = require('easyimage');
var sio = require('socket.io');
var Deferred = require("promised-io/promise").Deferred;
var when = require("promised-io/promise");
var bodyParser = require('body-parser');

//Strings for results
var MESSAGES = {
	USER_REGISTRATION_ERROR: 'There was an error, please try again.',
	USER_REGISTRATION_SUCCESS: 'New user successfully registered.',
	USER_REGISTRATION_EXISTS: 'User already in exists.'

};
var DS = require('jps-ds').DS;
var _ds = new DS({
	host: 'angularcms:angularcms@paulo.mongohq.com:10089/app19632340',
	models: {
		'users': 		{ username: String, email: String, password: String, active: Boolean,  meta: Object, token: String, created: Date, updated: Date },
		'uploads': 	{ title: String, body: String, image: String, path: String, filename: String, meta: Object, created: Date, updated:Date, userid: String},
		'posts': 		{ title: String, body: String, image: String, published: Boolean, created: Date, updated: Date, status: String, userid: String, meta: Object},
		'pages': 		{ title: String, body: String, image: String, published: Boolean, created: Date, updated: Date, status: String, userid: String, meta: Object},
		'themes': 	{  },
		'widgets': 	{ title: String, body: String, path: String, filename: String, meta: Object, created: Date, updated:Date, userid: String, active: Boolean},
		'plugins': 	{ title: String, body: String, path: String, filename: String, meta: Object, created: Date, updated:Date, userid: String, active: Boolean}
	}
});

function delay(ms, value) {
	// create a new Deferred
	var deferred = new Deferred();
	setTimeout(function () {
		// fulfill the deferred/promise, all listeners to the promise will be notified, and
		// provided the value as the value of the promise
		deferred.resolve(value);
	}, ms);
	// return the promise that is associated with the Deferred object
	return deferred.promise;
}

//### hashPassword
//Hash password using basic sha1 hash.
var hashPassword = function (pass, salt) {
	var shasum = crypto.createHash('sha1');
	shasum.update(salt + pass);

	return shasum.digest('hex');
}

//## Configuration

//### Cloud Files Config
var cloudfilesConfig = {
	auth: {
		username: '',
		apiKey: '',
		host: 'lon.auth.api.rackspacecloud.com'
	},
	servicenet: true
};

//### Colors Config
var colors = require('colors');
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

//# Class Objects


//## Rest Resource
//I am a RESTful resource object for handling CRUD operations on v1 or v2 api.
var RestResource = {
	config: null,
	init: function (config) {
		this.config = config;
		return this;
	},

	useversion: 'v2',
	urls: {
		v1: 'https://www..com',
		v2: '/api/v2/'
	},
	//### index
	//I handle displaying a message with the version for this api.
	index: function (req, res, next) {
		res.json({
			message: 'REST API Server ' + RestResource.useversion
		});
	},

	//### v1index
	//I handle displaying a message with the version for v1 index.
	v1index: function (req, res, next) {
		RestResource.useversion = 'v1';
		request(RestResource.urls[RestResource.useversion], function (error, response, body) {
			console.log(error, response, body);
			res.json(JSON.parse(body));
		});
	},

	//### v2index
	//I handle displaying a message for the v2 api index.
	v2index: function (req, res, next) {
		RestResource.version = 'v2';
		res.json({
			message: 'REST API Server ' + RestResource.useversion
		});
	},

	findOne: function (req, table, query, success, fail) {
		//Open db
		var db = new mongo.Db('angular-cms', new mongo.Server(config.db.host, config.db.port));
		db.open(function (err, db) {
			db.collection(table, function (err, collection) {
				var options = req.params.options || {};
				collection.findOne(query, options, function (err, cursor) {
					if (cursor != null) {
						success(cursor);
					} else {
						err = "No data found!";
						fail(err);
					}
					db.close();
				});
			});
		});
	},
	/**
	 * //### login
	 //I handle trying to authorized a user with the v1 api server.
	 * @param req
	 * @param res
	 * @param next
	 */
	login: function (req, res, next) {
		var query = {};
		console.log(req.body);

		//TODO: Need to make this externalized.
		if (req.body.username) {
			query.username = req.body.username;
		}
		if (req.body.email) {
			query.email = req.body.email;
		}

		//TODO: Hashing on client side
		query.password = hashPassword(req.body.password, req.body.email);

		console.log('Login Query: ', query);

		var deferred = new Deferred();

		var userFound = false;
		RestResource.findOne(req, 'users', query, function (u) {
			userFound = true;
			res.jsonp(200, {
				success: true,
				result: u
			});

		}, function (error) {
			userFound = false;
			res.jsonp(404, {
				status: false,
				error: true,
				message: 'Invalid email/password.'
			});


		});


	},
	/**
	 * Handle registering a new user
	 * @param req
	 * @param res
	 * @param next
	 */
	register: function (req, res, next) {
		var data = req.body,
			user = null,
			query = {
				email: req.body.email
			};


		data.password = hashPassword(req.body.password, req.body.email),
			console.log(String("Register user").debug, req.body);


		RestResource.findOne(req, 'users', query, function (u) {
			user = u;
			res.jsonp(404, {
				status: false,
				message: MESSAGES.USER_REGISTRATION_EXISTS
			});

		}, function (error) {
			user = null;
			var db = new mongo.Db(config.db.name, new mongo.Server(config.db.host, config.db.port, {safe: true}));
			db.open(function (err, db) {
				db.collection('users', function (err, collection) {
					collection.insert(data, function (err, docs) {
						console.log(err, docs);
						if (!err) {
							res.header('Content-Type', 'application/json');
							res.jsonp(200, {
								status: true,
								message: MESSAGES.USER_REGISTRATION_SUCCESS,
								user: req.body
							});
						} else {
							res.jsonp(404, {
								status: false,
								message: MESSAGES.USER_REGISTRATION_ERROR
							});
							console.log(error.warn);
						}
						db.close();
					});
				});
			});

		});
	},
	session: function (req, res, next) {
	},

	insert: function (collection, data) {
		console.log(data);
		var deferred = new Deferred();

		var db = new mongo.Db(config.db.name, new mongo.Server(config.db.host, config.db.port, {safe: false}));
		db.open(function (err, db) {
			db.collection('users', function (err, collection) {
				collection.insert(data, function (err, docs) {
					console.log(err, docs);
					if (!err) {
						deferred.resolve(true);
					} else {
						deferred.reject(false);
					}
					db.close();
				});
			});
		});
		return deferred.promise;
	},
	//### upload
	//I handled processing a uploaded file on the v2 server.
	upload: function (req, res, next) {
		var appid = 'public';

		if (req.param('appid')) {
			appid = String(req.param('appid'));
		}

		console.log(req.files)

		//Handle if dynamic filenames are enabled
		var tmp_filename = req.files.file.name || 'tmp_name';
		var filename = tmp_filename;
		var tmp_path = req.files.file.path;
		var target_dir = config.uploadsDestDir + '/' + appid + '/';
		var target_path = config.uploadsDestDir + '/' + appid + '/' + filename;
		var thumb_dir = config.uploadsDestDir + '/' + appid + '/thumbnail/';
		var thumb_path = config.uploadsDestDir + '/' + appid + '/thumbnail/' + filename;

		//Get the params for cropping an image
		var x1 = req.body.x1, y1 = req.body.y1, x2 = req.body.x2, y2 = req.body.y2, height = req.body.height, width = req.body.width, filepath = target_path;

		if (!width) {
			width = 150;
		}

		//Log the vars
		console.log(x1, x2, y1, y2, height, width, thumb_path);

		//Orignal image
		console.log(String('Temp Path: ' + tmp_path).warn);
		console.log(String('Target Dir: ' + target_dir).warn);
		console.log(String('Target Path: ' + target_path).warn);

		//Thumbnail image
		console.log(String('Original File: ' + filename).debug);
		console.log(String('Original File Path: ' + target_path).debug);
		console.log(String('Thumb Dir: ' + thumb_dir).debug);
		console.log(String('Thumb Path: ' + thumb_path).debug);

		//Create the directory and move the file to that directory
		fs.mkdir(target_dir, 0777, function (e) {

			//Rename the file
			fs.rename(tmp_path, target_path, function (err) {
				if (err) {
					console.error('File Rename Error:', err);
				}
				;

				//Upload the original to cloudfiles
				//rackspaceUpload(target_path, target_dir, filename);

				//Create the thumb directory
				fs.mkdir(thumb_dir, 0777, function (e) {

					//Create the thumbnail from the default image
					var imgOptions = {
						src: target_path,
						dst: thumb_path,
						width: width,
						height: height,
						quality: 100,
						x: x1,
						y: y1
					};

					//Resize the image
					easyimg.resize(imgOptions, function (e) {
						console.log('easyimg', imgOptions, e);


						//Upload thumb to rackspace
						/*
						 rackspaceUpload(thumb_path, thumb_dir, filename, function(results) {
						 });
						 */

//set the  new path on the file
						req.files.file.target_dir = target_dir;
						req.files.file.target_path = target_path;
						req.files.file.thumb_path = thumb_path;
						req.files.file.thumb_dir = thumb_dir;
						req.files.file.filename = filename;

						//build the response object
						var json = {
							status: true,
							filename: filename,
							targetDir: target_dir,
							targetPath: target_path,
							thumbDir: thumb_dir,
							thumbPath: thumb_path,
							msg: 'File Uploaded',
							results: req.files,
							appid: appid
						};

						//Output the results
						res.send(json);
					});
				});
			});
		});
	},
	//### imageCrop
	//I handle processing a uploaded image, cropping it and moving it to the proper directory, and uploaded to Rackspace Cloud Files.
	imageCrop: function (req, res, next) {
		var appid = null;

		if (req.param('appid')) {
			appid = String(req.param('appid'));
		}

		//Handle if dynamic filenames are enabled
		var tmp_filename = req.files.file.name;
		var filename = tmp_filename;
		var tmp_path = req.files.file.path;
		var target_dir = config.uploadsDestDir + '/' + appid + '/';
		var target_path = config.uploadsDestDir + '/' + appid + '/' + filename;
		var thumb_dir = config.uploadsDestDir + '/' + appid + '/thumbnail/';
		var thumb_path = config.uploadsDestDir + '/' + appid + '/thumbnail/' + filename;

		//Get the params for cropping an image
		var x1 = req.body.x1, y1 = req.body.y1, x2 = req.body.x2, y2 = req.body.y2, height = req.body.height, width = req.body.width, filepath = target_path;

		if (!width) {
			width = 100;
		}

		//Dev logger
		console.log(x1, x2, y1, y2, height, width, thumb_path);
		console.log(String('Target Path: ' + target_path).warn);
		console.log(String('Target Dir: ' + target_dir).warn);
		console.log(String('Temp Path: ' + tmp_path).warn);

		//Create the directory and move the file to that directory
		fs.mkdir(target_dir, 0777, function (e) {

			//Rename the file
			fs.rename(tmp_path, target_path, function (err) {
				if (err) {
					console.error('File Rename Error:', err);
				}
				;

				//Create the thumbnail from the default image
				var imgOptions = {
					src: target_path,
					dst: thumb_path,
					width: width,
					height: height,
					quality: 100,
					x: x1,
					y: y1
				};

				//Create the thumb directory and resize the image
				fs.mkdir(thumb_dir, 0777, function (e) {
					//Resize the image
					easyimg.resize(imgOptions, function (e) {
						console.log('easyimg', e);
					});
				});
				//unlink the file
				fs.unlink(tmp_path, function () {
					if (err) {

						console.error('File Unlink Error: ', err);

					} else {

						//set the  new path on the file
						req.files.file.target_dir = target_dir;
						req.files.file.target_path = target_path;
						req.files.file.thumb_path = thumb_path;
						req.files.file.thumb_dir = thumb_dir;

						req.files.file.filename = filename;

						//build the response object
						var json = {
							status: true,
							filename: filename,
							msg: 'File Uploaded',
							results: req.files,
							appid: appid
						};
						res.send(json);
					}
				});
			});
		});
	},
	//### get
	//I handle gathering records dynamically from a call to the v2 api.
	get: function (req, res, next) {
		console.warn('find all', req.params.collection);
		_ds.findAll(req.params.collection).then(function(data){
			res.send(data);
		}, function(err){
			res.send(err);
		});
	},
	//### add
	//I handle adding a record to the database.
	add: function (req, res, next) {
		_ds.create(req.params.collection, req.body).then(function(data){
			console.warn( 'create', data);
			res.send(data);
		}, function(err){
			res.send(err);
		});
	},
	//### edit
	//I handle
	edit: function (req, res, next) {
		var data = req.body;
		delete data._id;
		_ds.update(req.params.collection, req.params.id, data).then(function(data){
			console.warn(data);
			res.send(data);
		}, function(err){
			res.send(err);
		});
	},
	//### view
	//I handle
	view: function (req, res, next) {
	},
	//### destroy
	//I handle
	destroy: function (req, res, next) {
		_ds.destroy(req.params.collection, req.params.id).then(function(data){
			console.warn(data);
			res.send(data);
		}, function(err){
			res.send(err);
		});
	},
	//### cloudupload
	//I handle
	cloudupload: function (req, res, next) {
		var appid = null, results = null;
		if (req.param('appid')) {
			appid = String(req.param('appid'));
		}

		console.log(req.files);

	},
	/*
	 * flavorize - Changes JSON based on flavor in configuration
	 */
	flavorize: function (flavor, doc, direction) {
		if (direction == "in") {
			switch (flavor) {
				case "sproutcore":
					delete doc['guid'];
					// only do this in case flavor is set to sproutcore
					break;
				case "nounderscore":
					delete doc['id'];
					// only do this in case flavor is set to sproutcore
					break;
				default:
					break;
			}
		} else {
			switch (flavor) {
				case "sproutcore":
					var guid = doc._id.toHexString();
					delete doc['_id'];
					doc.guid = guid;
					break;
				case "nounderscore":
					var id = doc._id.toHexString();
					delete doc['_id'];
					doc.id = id;
					break;
				default:
					doc._id = doc._id.toHexString();
					break;
			}
		}
		return doc;
	}
};

//# Routes

//### v2 API
//v2 mongo rest api
app.get('/api/v2', RestResource.v2index);
app.post('/api/v2/imagecrop', RestResource.imageCrop);
app.post('/api/v2/cloudupload', RestResource.cloudupload);
app.post('/api/v2/upload', RestResource.upload);

//Always users table
app.post('/api/v2/users/login', bodyParser.json(), RestResource.login);
app.post('/api/v2/users/register', bodyParser.json(), RestResource.register);
app.post('/api/v2/users/session', bodyParser.json(), RestResource.session);

//Dynamic REST
app.get('/api/v2/:db/:collection/:id?', RestResource.get);
app.post('/api/v2/:db/:collection', bodyParser.json(), RestResource.add);
app.put('/api/v2/:db/:collection/:id', bodyParser.json(), RestResource.edit);
app.delete('/api/v2/:db/:collection/:id', RestResource.destroy);


//Readme
var markdown = require("markdown").markdown;
app.get('/api/v2/README', function (res, req) {
	var localPath = __dirname + '/../README.md';
	fs.readFile(localPath, 'utf8', function (err, data) {
		if (err) {
			req.end('There was an error.');
			return console.log(err);
		} else {
			req.writeHead(200, {
				"Content-Type": 'utf8',
				"Content-Length": data.length
			});
			req.end(data);
		}
		console.log(data);
	});
});
/* ======================[ @TODO: Other Rest Utility Methods ]====================== */

//### rackspaceUpload
//Upload a image file and create thumbnail and send to Rackspace Cloud Files.
function rackspaceUpload(localPath, targetPath, filename, cb) {

};


//### getFile
//Get file contents from a file.
function getFile(localPath, mimeType, res) {

	fs.readFile(localPath, 'utf8', function (err, data) {
		if (err) {
			res.end('There was an error.');
			return console.log(err);
		} else {
			res.writeHead(200, {
				"Content-Type": 'utf8',
				"Content-Length": data.length
			});
			res.end(data);
		}
		console.log(data);

	});
};

//### writeFile
//Write contents to a file
function writeFile(localPath, contents) {
	// create a stream, and create the file if it doesn't exist
	stream = fs.createWriteStream(localPath);
	console.log('writeFile', localPath);
	stream.on("open", function () {
		// write to and close the stream at the same time
		stream.end(contents, 'utf-8');
		res.end(html);
	});
};

//### modules
//Gather all of the files and folders in the app/modules directory
app.get('/api/v2/modules', function (req, res) {
	var result = fs.readdir('./app/cms-content', function (err, files) {
		console.log(files);
		res.header('Content-Type', 'application/json');
		res.jsonp(200, files);
	});
});

//Write the pass.json file to the file system
app.get('/api/v2/smartpass/sign', function (req, res) {
	var result = writeFile(req.params('path'), req.params('contents'));
	res.header('Content-Type', 'application/json');
	res.jsonp(200, result);
});


var config = {};
var publicPath = config.publicDir;
var uploadsTmpDir = config.uploadsTmpDir;
var uploadDestDir = config.uploadDestDir;


//Export to public api
exports.rest = {
	RestResource: RestResource,
	app: app,
	express: express,
	init: function (options) {

		console.log('email: admin@email.com '.verbose);
		console.log('password: admin1234'.verbose)

		config = options;

		/*
		 */
		//### Express Config
		//Configure the express app server.
		app.configure(function () {
			app.set("view options", {layout: false, pretty: true});

			app.use(express.static(config.staticDir));
			app.use(express.directory(config.publicDir));

			app.use(bodyParser.urlencoded({ extended: false }));
			// parse application/json
			app.use(bodyParser.json());

			app.use("jsonp callback", true);
			app.use('/api/upload', upload.fileHandler());


			app.use(function (req, res, next) {
				console.log('%s %s', req.method, req.body, req.url);
				next();
			});
		});


		app.listen(options.port || process.env.PORT, function () {
			console.log(String('Node.js REST server listening on port: ' + options.port).verbose);
		});

		return app;
	}
};
