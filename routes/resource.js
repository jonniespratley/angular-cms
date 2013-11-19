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
var colors = require('colors');
//var easy_rackimg = require("easy_rackimg");
var cloudfiles = require('cloudfiles');
var easyimg = require('easyimage');
var sio = require('socket.io');
var racker = require('racker');

//## Configuration


//### Cloud Files Config
var cloudfilesConfig = {
	auth : {
    	username: '',
		apiKey: '',
		host : 'lon.auth.api.rackspacecloud.com'
	},
	servicenet: true
};
racker.set('user', 'siteadmin').set('key', '').set('host', 'us');

//### Colors Config
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


//### Socket.io Config
//This is for use with geo analytics and other backend data from the app. listen for connected clients
var config = {
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
	staticDir : './app',
	publicDir : __dirname + '/app',
	uploadsTmpDir : 'temp',
	uploadsDestDir : 'files',
	logFormat: '[:date] - [:method] - :url - :status - :response-time ms'
};


var publicPath = config.publicDir;
var uploadsTmpDir = config.uploadsTmpDir;
var uploadDestDir = config.uploadDestDir;



//### Express Config
//Configure the express app server.
app.configure(function () {
	
	 app.use('/api/v2/upload2', upload.fileHandler({
        uploadDir: config.uploadsDestDir,
        uploadUrl: '/files/uploads',
        imageVersions: {
            thumbnail: {
                width: 125,
                height: 125
            }
        }
    }));
    
	app.use(express.bodyParser({
		keepExtensions : true,
		uploadDir : config.uploadsDestDir
	}));
	app.use(express.static(config.staticDir));
	app.use(express.directory(config.staticDir));
	app.use(express.logger(config.logFormat));
	app.use("jsonp callback", true);
	
	app.use(function (err, req, res, next) {
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});
});


//## Resource
//I am the Resource object that holds methods for performing many CRUD operations on a MongoDB collection.
var Resource = {
	host : config.db.host,
	port : 27017,
	/**
	 * I enable logging or not.
	 */
	debug : true,
	/**
	 * I am the interal logger.
	 */
	log : function (obj) {
		if (Resource.debug) {
			console.log(obj);
		}
	},
	/**
	 * I am the name of the database.
	 */
	databaseName : 'accounts_db',
	/**
	 * I am the name of this collection.
	 */
	name : 'accounts',
	mongo : mongo,
	server : null,
	db : null,
	mongoServer : mongo.Server,
	mongoDb : mongo.Db,
	bson : mongo.BSONPure,
	/**
	 * I am the example schema for this resources.
	 */
	schema : {
		id : '',
		ns : 'com.domain.app',
		title : '',
		body : '',
		address1 : '',
		address2 : '',
		city : '',
		state : '',
		zip : '',
		type : '',
		active : '0',
		created : '',
		modified : '',
		website : '',
		apple_url : '',
		android_url : '',
		user_id : '',
		application_id : '',
		appcellerator_url : '',
		settings : '',
		plan : '',
		exp_date : '',
		upfront_cost : '',
		monthly_cost : '',
		service_term : '12',
		service_value : '',
		total_value : '',
		sla_number : '',
		contract_in : '',
		app_submitted : ''
	},
	routes : {
		'status' : 'dbStatus'
	},
	/**
	 * I create a new instance of the database.
	 */
	initDb : function () {
		Resource.server = new Server (Resource.host, Resource.port, {
			auto_reconnect : true,
			safe : true
		});
		Resource.db = new Db (Resource.databaseName, Resource.server, {safe: false});
		/**
		 * Open the database and check for collection, if none
		 * then create it with the schema.
		 */
		Resource.db.open(function (err, db) {
			if (!err) {
				Resource.log('Connected to ' + Resource.databaseName);
				db.collection(Resource.name, {
					safe : true
				}, function (err, collection) {
					if (err) {
						Resource.log('The collection doesnt exist. creating it with sample data...');
						Resource.populateDb();
					}
				});
			}
		});
	},
	/**
	 * I populate the document db with the schema.
	 */
	populateDb : function () {
		Resource.db.collection(Resource.name, function (err, collection) {
			collection.insert(Resource.schema, {
				safe : true
			}, function (err, result) {
				Resource.log(result);
			});
		});
	},
	dbStatus : function () {
		console.log('get db status');
	},
	/**
	 * I find all of the records
	 * @param {Object} req
	 * @param {Object} res
	 */
	findAll : function (req, res) {
		Resource.db.collection(Resource.name, function (err, collection) {
			collection.find().toArray(function (err, items) {
				Resource.log(Resource.name + ':findAll - ' + JSON.stringify(items));
				res.send(items);
			});
		});
	},
	/**
	 * I find one of the records by id.
	 * @param {Object} req
	 * @param {Object} res
	 */
	findById : function (req, res) {
		var id = req.params.id;
		Resource.log(Resource.name + ':findById - ' + id);
		Resource.db.collection(Resource.name, function (err, collection) {
			collection.findOne({
				'_id' : new Resource.BSON.ObjectID (id)
			}, function (err, item) {
				res.send(item);
			});
		});
	},
	/**
	 * I add a record to the collection
	 * @param {Object} req
	 * @param {Object} res
	 */
	add : function (req, res) {
		var data = req.body;
		Resource.log(Resource.name + ':add - ' + JSON.stringify(data));
		Resource.db.collection(Resource.name, function (err, collection) {
			collection.insert(data, {
				safe : true
			}, function (err, result) {
				if (err) {
					res.send({
						'error' : 'An error has occurred'
					});
				} else {
					Resource.log('Success: ' + JSON.stringify(result[0]));
					res.send(result[0]);
				}
			});
		});
	},
	/**
	 * I update a record in the collection
	 * @param {Object} req
	 * @param {Object} res
	 */
	update : function (req, res) {
		var id = req.params.id;
		var data = req.body;
		Resource.log(Resource.name + ':destroy -' + id + ' - ' + JSON.stringify(data));
		Resource.db.collection(Resource.name, function (err, collection) {
			collection.update({
				'_id' : new Resource.BSON.ObjectID (id)
			}, data, {
				safe : true
			}, function (err, result) {
				if (err) {
					res.send({
						'error' : 'An error has occurred'
					});
					console.log('Error updating ' + Resource.name + ': ' + err);
				} else {
					console.log('' + result + 'document(s) updated');
					res.send(data);
				}
			});
		});
	},
	/**
	 * I delete a record in the collection.
	 * @param {Object} req
	 * @param {Object} res
	 return Todo.findById(req.params.id, function(err, todo) {
	 return todo.remove(function(err) {
	 if (!err) {
	 console.log("removed");
	 return res.send('')
	 }
	 });
	 });
	 */
	destroy : function (req, res) {
		var id = req.params.id;
		Resource.log(Resource.name + ':destroy -' + id);
		Resource.db.collection(Resource.name, function (err, collection) {
			collection.remove({
				'_id' : new Resource.BSON.ObjectID (id)
			}, {
				safe : true
			}, function (err, result) {
				if (err) {
					res.send({
						'error' : 'An error has occurred'
					});
					Resource.log('Error updating ' + Resource.name + ': ' + err);
				} else {
					res.send(req.body);
				}
			});
		});
	},
	/*
	 * flavorize - Changes JSON based on flavor in configuration
	 */
	flavorize : function (flavor, doc, direction) {
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
