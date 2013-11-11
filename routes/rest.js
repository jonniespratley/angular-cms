//# REST 
// This is the resource object that contains all of the REST api methods for a full CRUD on a mongo account document.

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


//# Class Objects


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





//## Rest Resource
//I am a RESTful resource object for handling CRUD operations on v1 or v2 api.
var RestResource = {
	useversion : 'v1',
	urls : {
		v1 : 'https://www..com',
		v2 : '/api/v2/'
	},
	//### index
	//I handle displaying a message with the version for this api.
	index : function (req, res, next) {
		res.json({
			message : ' REST API Server ' + RestResource.useversion
		});
	},
	//### v1index
	//I handle displaying a message with the version for v1 index.
	v1index : function (req, res, next) {
		RestResource.useversion = 'v1';
		request(RestResource.urls[RestResource.useversion], function (error, response, body) {
			console.log(error, response, body);
			res.json(JSON.parse(body));
		});
	},
	//### v1get
	//I handle forwarding requests to the www.myappmatrix.com v1 api server and handling the results.
	v1get : function (req, res, next) {
		var url = RestResource.urls[RestResource.useversion] + '/Api/getall/' + req.param('model') + '?appid='+req.param('appid');

		console.log('URL', url.debug);
		
		var options = {
			url : url,
			qs:{
				appid: req.param('appid')
			},
			headers : {
				Authorization : 'Basic: bXk6ZnJlZA=='
			}
		};
		
		if (req.param('appid')) {
			options.qs['appid'] = String(req.param('appid'));
		}
		request(options, function (error, response, body) {
			if (!error) {
				try {
					res.json(JSON.parse(body).results);
				} catch(e) {
					console.log(e);
					res.json(Array({
						status : false,
						message : 'There was an error parsing the data.'
					}));
				}
			}
		});
	},
	//### v1method
	//I handle forwarding method requests to the www.myappmatrix.com v1 api server and handling the results.
	v1method : function (req, res, next) {
		var url = RestResource.urls[RestResource.useversion] + '/' + req.param('method');
		
		var options = {
			url : url,
			method : 'GET',
			headers : {
				Authorization : 'Basic: bXk6ZnJlZA=='
			}
		};

		options.qs = {}
		
		if (req.param('appid')) {
			options.qs['appid'] = String(req.param('appid'));
		}
		request(options, function (error, response, body) {
			if (!error) {
				try {
					res.json(JSON.parse(body).results);
				} catch(e) {
					console.log(e);
					res.json(Array({
						status : false,
						message : 'There was an error parsing the data.'
					}));
				}
			}
		});
	},
	//### v1add
	//I handle forwarding post requests to the www.myappmatrix.com v1 api server.
	v1add : function (req, res, next) {
		RestResource.version = 'v1';

		var url = RestResource.urls[RestResource.useversion] + '/' + req.param('collection');
		var method = 'POST';
		if(req.param('id')){
			method = 'PUT';
			url += '/'+ req.param('id');
		}
		
		var options = {
			url : url,
			method : method,
			json: req.body,
			headers : {
				Authorization : 'Basic: bXk6ZnJlZA=='
			}
		};

		options.qs = {}
		
		if (req.param('appid')) {
			options.qs['appid'] = String(req.param('appid'));
		}
		
		
		
		console.log(url);
		
		
		
		request(options, function (error, response, body) {
			if (!error) {
				try {
					
					res.json(body);
			
					
				} catch(e) {
					console.log(e);
					res.json(Array({
						status : false,
						message : 'There was an error parsing the data.'
					}));
				}
			}
		});
		 
	},
	//### v2index
	//I handle displaying a message for the v2 api index.
	v2index : function (req, res, next) {
		RestResource.version = 'v2';
		res.json({
			message : ' REST API Server ' + RestResource.useversion
		});
	},
	//### login
	//I handle trying to authorized a user with the v1 myappmatrix api server.
	login : function (req, res, next) {
		var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
			'auto_reconnect' : true,
			'safe' : true
		}));
		db.open(function (err, db) {
			db.collection(req.params.collection, function (err, collection) {
				var query = {
					email : req.param('email'),
					password : hashPassword(req.param('password'))
				};
				var options = req.params.options || {};
				collection.findOne(query, options, function (err, cursor) {
					if (cursor != null) {
						res.header('Content-Type', 'application/json');
						res.jsonp(200, {
							status : true,
							results : {
								user : cursor
							}
						});
					} else {
						res.jsonp(404, {
							status : false,
							message : 'Invalid credentials, please try again.'
						});
					}
					db.close();
				});
			});
		});
	},
	//### upload
	//I handled processing a uploaded file on the v2 server.
	upload : function (req, res, next) {
		var appid = null;
		
		
		if (req.param('appid')) {
			appid = String(req.param('appid'));
		}
		
		
		
		//Handle if dynamic filenames are enabled
		var tmp_filename = req.files.file.name;
		var filename = tmp_filename;
		var tmp_path = req.files.file.path;
		var target_dir =  config.uploadsDestDir + '/' + appid + '/';
		var target_path = config.uploadsDestDir + '/' + appid + '/' + filename;
		var thumb_dir = config.uploadsDestDir + '/' + appid + '/thumbnail/';
		var thumb_path = config.uploadsDestDir + '/' + appid + '/thumbnail/' + filename;
		
		
		//Get the params for cropping an image
		var x1 = req.body.x1,
			y1 = req.body.y1,
			x2 = req.body.x2,
			y2 = req.body.y2,
			height = req.body.height,
			width = req.body.width,
			filepath = target_path;
			
			
			if(!width){
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
				};
				
				//Upload the original to cloudfiles
				rackspaceUpload( target_path, target_dir, filename );

					//Create the thumb directory
					fs.mkdir(thumb_dir, 0777, function(e){

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
						easyimg.resize( imgOptions, function(e){
							console.log('easyimg', imgOptions, e);
							
							
							//Upload thumb to rackspace
							rackspaceUpload( thumb_path, thumb_dir, filename, function(results){
								
								//set the  new path on the file
								req.files.file.target_dir = target_dir;
								req.files.file.target_path = target_path;
								req.files.file.thumb_path = thumb_path;
								req.files.file.thumb_dir = thumb_dir;
								req.files.file.filename = filename;
						
								//build the response object
								var json = {
									status : true,
									filename : filename,
									targetDir: target_dir,
									targetPath: target_path,
									thumbDir: thumb_dir,
									thumbPath: thumb_path,
									msg : 'File Uploaded',
									results : req.files,
									appid : appid
								};
								
								//Output the results
								res.json(json);
							
							});
						} );
				
					});
				
			});
		});
	},
	//### imageCrop
	//I handle processing a uploaded image, cropping it and moving it to the proper directory, and uploaded to Rackspace Cloud Files.
	imageCrop: function(req, res, next) {
		var appid = null;
		
		
		if (req.param('appid')) {
			appid = String(req.param('appid'));
		}
		
		
		
		//Handle if dynamic filenames are enabled
		var tmp_filename = req.files.file.name;
		var filename = tmp_filename;
		var tmp_path = req.files.file.path;
		var target_dir =  config.uploadsDestDir + '/' + appid + '/';
		var target_path = config.uploadsDestDir + '/' + appid + '/' + filename;
		var thumb_dir = config.uploadsDestDir + '/' + appid + '/thumbnail/';
		var thumb_path = config.uploadsDestDir + '/' + appid + '/thumbnail/' + filename;
		
		
		//Get the params for cropping an image
		var x1 = req.body.x1,
			y1 = req.body.y1,
			x2 = req.body.x2,
			y2 = req.body.y2,
			height = req.body.height,
			width = req.body.width,
			filepath = target_path;
			
			
			if(!width){
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
				};
				
				
				
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
					fs.mkdir(thumb_dir, 0777, function(e){
						//Resize the image
						easyimg.resize( imgOptions, function(e){
							console.log('easyimg', e);
						} );
						
						
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
							status : true,
							filename : filename,
							msg : 'File Uploaded',
							results : req.files,
							appid : appid
						};
						res.json(json);
					}
				});
				
				
				
				
			});
		});
	 
		
		
	},
	//### get
	//I handle gathering records dynamically from a call to the v2 api.
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
	//### add
	//I handle
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
	//### edit
	//I handle
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
	//### view
	//I handle
	view : function (req, res, next) {
	},
	//### destroy
	//I handle
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
	},
	//### cloudupload
	//I handle
	cloudupload: function(req, res, next){
		var appid = null, results = null;
		if (req.param('appid')) {
			appid = String(req.param('appid'));
		}
		
		console.log(req.files);

	}
};


//# Routes

//### v1 API
//v1 cakephp rest api - These routes handle the version 1 api calls
app.get('/api', RestResource.index);
app.get('/api/v1', RestResource.v1index);
app.get('/api/v1/:db/method/:method?', RestResource.v1method);
app.get('/api/v1/:db/:model?', RestResource.v1get);
app.put('/api/v1/:db/:collection/:id?', RestResource.v1add);
app.post('/api/v1/:db/:collection', RestResource.v1add);


//### v2 API
//v2 mongo rest api
app.get('/api/v2', RestResource.v2index);
app.post('/api/v1/imagecrop', RestResource.imageCrop);
app.post('/api/v2/cloudupload', RestResource.cloudupload);
app.post('/api/v2/upload', RestResource.upload);
app.get('/api/v2/:db/:collection/login', RestResource.login);
app.get('/api/v2/:db/:collection/:id?', RestResource.get);
app.post('/api/v2/:db/:collection', RestResource.add);
app.put('/api/v2/:db/:collection/:id', RestResource.edit);
app.delete ('/api/v2/:db/:collection/:id', RestResource.destroy);






/* ======================[ @TODO: Other Rest Utility Methods ]====================== */

//### rackspaceUpload
//Upload a image file and create thumbnail and send to Rackspace Cloud Files.
function rackspaceUpload(localPath, targetPath, filename, cb){
		racker
			.upload(localPath)
			.to('myappmatrix/'+targetPath)
			.as(filename)
			.end(function (err, result) {
				console.log(err, result);
				if(cb){
					cb(result);
				}
		});
				
				 
	
};


//### hashPassword   
//Hash password using basic sha1 hash.
function hashPassword (pass) {
	var shasum = crypto.createHash('sha1');
	shasum.update(config.security.salt + pass);
	var out = shasum.digest('hex');
	console.log(out);
	return out;
};


//### getFile   
//Get file contents from a file.
function getFile (localPath, mimeType, res) {
	fs.readFile(localPath, function (err, contents) {
		if (!err) {
			res.writeHead(200, {
				"Content-Type" : mimeType,
				"Content-Length" : contents.length
			});
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
};


//### writeFile   
//Write contents to a file
function writeFile (localPath, contents) {
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
	var result = fs.readdir('./app/modules', function (err, files) {
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

//Export to public api
exports.rest = {
	Resource : Resource,
	RestResource : RestResource,
	app : app,
	express : express,
	init : function (port) {
		app.listen(port);
		console.log('Server Listening on port ' + port, 'Resource listening on');
	}
};
