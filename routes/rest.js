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
var crypto = require( 'crypto' );
var path = require( 'path' );
var express = require( 'express' );
var path = require( 'path' );     //used for file path
var fs = require( 'fs-extra' );       //File System - for file manipulatio
var util = require( 'util' );
var request = require( 'request' );
var easyimage = require( 'easyimage' );
var upload = require( 'jquery-file-upload-middleware' );
var sio = require( 'socket.io' );
var Deferred = require( "promised-io/promise" ).Deferred;
var when = require( "promised-io/promise" );
var bodyParser = require( 'body-parser' );
var markdown = require( "markdown" ).markdown;
var busboy = require( 'connect-busboy' ); //middleware for form/file upload

//Strings for results
var MESSAGES = {
	USER_REGISTRATION_ERROR: 'There was an error, please try again.',
	USER_REGISTRATION_SUCCESS: 'New user successfully registered.',
	USER_REGISTRATION_EXISTS: 'User already in exists.'

};
var DS = require( 'jps-ds' ).DS;
var _ds = new DS( {
	host: 'angularcms:angularcms@paulo.mongohq.com:10089/app19632340',
	models: {
		'groups': {
			title: String,
			body: String,
			slug: String,
			created: Date,
			updated: Date
		},
		'users': {
			username: String,
			email: String,
			password: String,
			active: Boolean,
			meta: Object,
			token: String,
			created: Date,
			updated: Date
		},
		'uploads': {
			title: String,
			body: String,
			image: String,
			path: String,
			filename: String,
			meta: Object,
			created: Date,
			updated: Date,
			userid: String
		},
		'posts': {
			title: String,
			body: String,
			image: String,
			published: Boolean,
			created: Date,
			updated: Date,
			status: String,
			userid: String,
			meta: Object
		},
		'pages': {
			title: String,
			body: String,
			image: String,
			published: Boolean,
			created: Date,
			updated: Date,
			status: String,
			userid: String,
			meta: Object
		},
		'themes': {},
		'widgets': {
			title: String,
			body: String,
			path: String,
			filename: String,
			meta: Object,
			created: Date,
			updated: Date,
			userid: String,
			active: Boolean
		},
		'plugins': {
			title: String,
			body: String,
			path: String,
			filename: String,
			meta: Object,
			created: Date,
			updated: Date,
			userid: String,
			active: Boolean
		}
	}
} );

function delay(ms, value) {
	// create a new Deferred
	var deferred = new Deferred();
	setTimeout( function () {
		// fulfill the deferred/promise, all listeners to the promise will be notified, and
		// provided the value as the value of the promise
		deferred.resolve( value );
	}, ms );
	// return the promise that is associated with the Deferred object
	return deferred.promise;
}

//### hashPassword
//Hash password using basic sha1 hash.
var hashPassword = function (pass, salt) {
	var shasum = crypto.createHash( 'sha1' );
	shasum.update( salt + pass );

	return shasum.digest( 'hex' );
}

//## Configuration

//### Colors Config
var colors = require( 'colors' );
colors.setTheme( {
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
} );

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
	log: function () {
		console.log( util.inspect( arguments, {colors: true} ) );

	},
	//### index
	//I handle displaying a message with the version for this api.
	index: function (req, res, next) {
		res.json( {
			message: 'REST API Server ' + RestResource.useversion
		} );
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
		console.log( req.body );

		//TODO: Need to make this externalized.
		if (req.body.username) {
			query.username = req.body.username;
		}
		if (req.body.email) {
			query.email = req.body.email;
		}

		//TODO: Hashing on client side
		query.password = hashPassword( req.body.password, req.body.email );

		console.log( 'Login Query: ', query );

		_ds.findOne( 'users', query ).then( function (data) {
			res.json( 200, data );
		}, function (err) {
			res.json( 400, err );
		} );

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
		data.password = hashPassword( req.body.password, req.body.email ),
			console.log( String( "Register user" ).debug, req.body );
	},
	session: function (req, res, next) {
	},

	//### upload
	//I handled processing a uploaded file on the v2 server.
	upload: function (req, res, next) {
		var appid = 'public';

		if (req.param( 'appid' )) {
			appid = String( req.param( 'appid' ) );
		}

		console.log( util.inspect( req, {colors: true} ) );

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
		console.log( x1, x2, y1, y2, height, width, thumb_path );

		//Orignal image
		console.log( String( 'Temp Path: ' + tmp_path ).warn );
		console.log( String( 'Target Dir: ' + target_dir ).warn );
		console.log( String( 'Target Path: ' + target_path ).warn );

		//Thumbnail image
		console.log( String( 'Original File: ' + filename ).debug );
		console.log( String( 'Original File Path: ' + target_path ).debug );
		console.log( String( 'Thumb Dir: ' + thumb_dir ).debug );
		console.log( String( 'Thumb Path: ' + thumb_path ).debug );

		//Create the directory and move the file to that directory
		fs.mkdir( target_dir, 0777, function (e) {

			//Rename the file
			fs.rename( tmp_path, target_path, function (err) {
				if (err) {
					console.error( 'File Rename Error:', err );
				}

				//Create the thumb directory
				fs.mkdir( thumb_dir, 0777, function (e) {

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
					easyimg.resize( imgOptions, function (e) {
						console.log( 'easyimg', imgOptions, e );
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
						res.send( json );
					} );
				} );
			} );
		} );
	},

	//### get
	//I handle gathering records dynamically from a call to the v2 api.
	get: function (req, res, next) {
		if (req.param( 'id' )) {
			console.log( 'find one', req.params.id );
			_ds.findOne( req.params.collection, req.params.id ).then( function (data) {
				res.send( data );
			}, function (err) {
				res.send( err );
			} );
		} else {
			_ds.findAll( req.params.collection ).then( function (data) {
				res.send( data );
			}, function (err) {
				res.send( err );
			} );
		}
	},
	//### add
	//I handle adding a record to the database.
	add: function (req, res, next) {
		_ds.create( req.params.collection, req.body ).then( function (data) {
			console.warn( 'create', data );
			res.send( data );
		}, function (err) {
			res.send( err );
		} );
	},
	//### edit
	//I handle
	edit: function (req, res, next) {
		var data = req.body;
		delete data._id;
		_ds.update( req.params.collection, req.params.id, data ).then( function (data) {
			console.warn( data );
			res.send( data );
		}, function (err) {
			res.send( err );
		} );
	},
	//### view
	//I handle
	view: function (req, res, next) {
	},
	//### destroy
	//I handle
	destroy: function (req, res, next) {
		_ds.destroy( req.params.collection, req.params.id ).then( function (data) {
			console.warn( data );
			res.send( data );
		}, function (err) {
			res.send( err );
		} );
	},
	readme: function (res, req) {
		var localPath = __dirname + '/../README.md';
		fs.readFile( localPath, 'utf8', function (err, data) {
			if (err) {
				req.end( 'There was an error.' );
				return console.log( err );
			} else {
				req.writeHead( 200, {
					"Content-Type": 'utf8',
					"Content-Length": data.length
				} );
				req.end( data );
			}
			console.log( data );
		} );
	},
	plugins: function (req, res) {
		var result = fs.readdir( './app/cms-plugins', function (err, files) {
			console.log( files );
			res.header( 'Content-Type', 'application/json' );
			res.jsonp( 200, files );
		} );
	}
};

//### getFile
//Get file contents from a file.
function getFile(localPath, mimeType, res) {

	fs.readFile( localPath, 'utf8', function (err, data) {
		if (err) {
			res.end( 'There was an error.' );
			return console.log( err );
		} else {
			res.writeHead( 200, {
				"Content-Type": 'utf8',
				"Content-Length": data.length
			} );
			res.end( data );
		}
		console.log( data );

	} );
};

//### writeFile
//Write contents to a file
function writeFile(localPath, contents) {
	// create a stream, and create the file if it doesn't exist
	stream = fs.createWriteStream( localPath );
	console.log( 'writeFile', localPath );
	stream.on( "open", function () {
		// write to and close the stream at the same time
		stream.end( contents, 'utf-8' );
		res.end( html );
	} );
};

var config = {};
var publicPath = config.publicDir;
var uploadsTmpDir = config.uploadsTmpDir;
var uploadDestDir = config.uploadDestDir;

var cmsRest = function (options) {
	"use strict";

	var app = express();

	console.log( '\n\n---------------------'.verbose );
	console.log( 'cmsRest.js' );
	console.log( 'email: admin@email.com '.verbose );
	console.log( 'password: admin1234'.verbose )
	console.log( '---------------------\n\n'.verbose );

	config = options;

	//### Express Config
	//Configure the express app server.
	//### modules
	//Gather all of the files and folders in the app/modules directory
	app.get( config.apiBase + '/plugins', RestResource.plugins );
	//# Routes
	//### v2 API
	app.get( config.apiBase + '/readme', RestResource.readme );
	//v2 mongo rest api
	app.get( config.apiBase, RestResource.index );
	app.post( config.apiBase + '/upload', RestResource.upload );
	app.get( config.apiBase + '/upload', function (req, res, next) {
		res.send( {message: 'Upload a file with a POST.'} );
	} );

	//Always users table
	app.post( config.apiBase + '/users/login', bodyParser.json(), RestResource.login );
	app.post( config.apiBase + '/users/register', bodyParser.json(), RestResource.register );
	app.post( config.apiBase + '/users/session', bodyParser.json(), RestResource.session );

	//Dynamic REST
	app.get( config.apiBase + '/:db/:collection/:id?', RestResource.get );
	app.post( config.apiBase + '/:db/:collection', bodyParser.json(), RestResource.add );
	app.put( config.apiBase + '/:db/:collection/:id', bodyParser.json(), RestResource.edit );
	app.delete( config.apiBase + '/:db/:collection/:id', RestResource.destroy );

	app.configure( function () {
		app.use( busboy( {immediate: true} ) );
		app.use( function (req, res) {
			if (req.busboy) {
				req.busboy.on( 'file', function (fieldname, file, filename, encoding, mimetype) {
					// ...
					console.warn( fieldname, file, filename );
				} );
				req.busboy.on( 'field', function (key, value, keyTruncated, valueTruncated) {
					// ...
					console.log( key, value );
				} );
				// etc ...
			}
		} );
		app.set( "view options", {layout: false, pretty: true} );
		app.use( express.static( config.staticDir ) );
		app.use( express.directory( config.publicDir ) );
		app.use( bodyParser.json() );
		app.use( bodyParser.urlencoded() );
		app.use( "jsonp callback", true );

		app.use( config.apiBase + '/upload2', upload.fileHandler() );
		app.use( app.router );
	} );



	return app;
};

module.exports = cmsRest;
