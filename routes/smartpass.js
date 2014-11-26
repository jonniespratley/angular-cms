/**
 * @file smartpass.js
 * @comment
 * 
 * SmartPass API Module
 */
 

/**
 * Configuration Object to hold
 */
var config = {
	version: 'v1',
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

// Push options
var options = {
	gateway: 'gateway.sandbox.push.apple.com',
	cert: 'pusherCert.pem',
	key: 'pushKey.pem',
	passphrase: 'fred',
	port: 2195,
	enhanced: true,
	cacheLength: 100
};


// Express server
var express = require('express');

// Express instance
var app = express();

//Configure express
app.configure(function() {
	app.use(express.logger('dev'));
	app.use("jsonp callback", true);
	app.use(express.bodyParser({
		keepExtensions : true,
		uploadDir : './temp'
	}));
	
	// error logger
	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});

	// simple logger
	app.use(function(req, res, next) {
		console.log('%s %s', req.method, req.url);
		next();
	});

});



//Test device tokens
var deviceTokens = [
	'54563ea0fa550571c6ea228880c8c2c1e65914aa67489c38592838b8bfafba2a', 
	'd46ba7d730f8536209e589a3abe205b055d66d8a52642fd566ee454d0363d3f3'
];



//API Endpoint
app.get('/smartpass', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});



//API Version Endpoint - http://localhost:3535/smartpass/v1	
app.get('/smartpass/'+config.version, function(req, res) {
	res.json({message: 'AppMatrix Engine Apple Passbook API Server v1'});
});
 


//Register Pass endpoint
app.post('/smartpass/'+config.version+'/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber', function(req, res) {
	res.json({message: 'AppMatrix Engine Apple Passbook API Server v1'});
});



//Post Logging endpoint
app.post('/smartpass/'+config.version+'/log', function(req, res) {
	console.log(req.body);
	res.json({message: 'AppMatrix Engine Apple Passbook API Server v1'});
});


//Get Logging endpoint




//Unregister Pass
app.delete('/smartpass/'+config.version+'/devices/:deviceLibraryIdentifier/:passTypeIdentifier/:serialNumber', function(req, res) {
	res.json({message: 'AppMatrix Engine Apple Passbook API Server v1'});
});



//Get devices



//Register device
app.get('/smartpass/'+config.version+'/register/:token', function(req, res){

	console.log('Register device ' + req.param('token'));
});



//Get serial numbers
app.get('/smartpass/'+config.version+'/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier', function(req, res){

	console.log('Push to device ' + req.param('token'));
});




//Get latest version of pass
app.get('/smartpass/'+config.version+'/passes/:passTypeIdentifier/:serialNumber', function(req, res){

	console.log('Push to device ' + req.param('token'));
});




//Send push to device
app.get('/smartpass/'+config.version+'/push/:token', function(req, res){
	console.log('Push to device ' + req.param('token'));
});




//Export to public api
exports.smartpass = {
	app : app,
	express : express,
	init : function(port) {
		app.listen(port);
		console.log('SmartPass Server Listening on port ' + port);
	}
};





/**
 * smartpass Resource
 * @author Jonnie Spratley, AppMatrix
 * @created 10/23/12
 *
 * Resource - This is the resource object that contains all of the REST api methods for a full CRUD on a mongo log document.
 *
 * REST METHODS:
 *
 * HTTP     METHOD          URL
 * ======|==============|==============================================
 * GET      findAll         http://localhost:3000/logs
 * GET      findById        http://localhost:3000/logs/:id
 * POST     add             http://localhost:3000/logs
 * PUT      update          http://localhost:3000/logs/:id
 * DELETE   destroy         http://localhost:3000/logs/:id
 *
 * //Resource usage
 * var logs = require('./routes/logs');
 * app.get('/logs', logs.Resource.findAll);
 * app.post('/logs', logs.Resource.add);
 * app.put('/logs/:id', logs.Resource.update);
 * app.get('/logs/:id', logs.Resource.findById);
 * app.post('/logs/:id', logs.Resource.destroy);
 */
var Resource = {
	host : 'localhost',
	port : 27017,
	/**
	 * I enable logging or not.
	 */
	debug : true,
	/**
	 * I am the interal logger.
	 */
	log : function(obj) {
		if (Resource.debug) {
			console.log(obj);
		}
	},
	/**
	 * I am the name of the database.
	 */
	databaseName : 'logs_db',
	/**
	 * I am the name of this collection.
	 */
	name : 'logs',
	/**
	 * I am the example schema for this resources.
	 */
	schema : [{
		id : '',
		title : '',
		body : '',
		page : '',
		controller : '',
		action : '',
		created : '',
		modified : '',
		appid : '',
		user_id : '',
		log : '',
		ip : '',
		account_id : '',
		application_id : '',
	}],
	/**
	 * I populate the document db with the schema.
	 */
	populateDb : function() {
		db.collection(Resource.name, function(err, collection) {
			collection.insert(Resource.schema, {
				safe : true
			}, function(err, result) {
				Resource.log(result);
			});
		});
	},
	/**
	 * I find all of the records
	 * @param {Object} req
	 * @param {Object} res
	 */
	findAll : function(req, res) {
		db.collection(Resource.name, function(err, collection) {
			collection.find().toArray(function(err, items) {
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
	findById : function(req, res) {

		var id = req.params.id;

		Resource.log(Resource.name + ':findById - ' + id);

		db.collection(Resource.name, function(err, collection) {
			collection.findOne({
				'_id' : new BSON.ObjectID(id)
			}, function(err, item) {
				res.send(item);
			});
		});
	},
	/**
	 * I add a record to the collection
	 * @param {Object} req
	 * @param {Object} res
	 */
	add : function(req, res) {
		var data = req.body;

		Resource.log(Resource.name + ':add - ' + JSON.stringify(data));

		db.collection(Resource.name, function(err, collection) {
			collection.insert(data, {
				safe : true
			}, function(err, result) {
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
	update : function(req, res) {
		var id = req.params.id;
		var data = req.body;
		Resource.log(Resource.name + ':destroy -' + id + ' - ' + JSON.stringify(data));
		db.collection(Resource.name, function(err, collection) {
			collection.update({
				'_id' : new BSON.ObjectID(id)
			}, data, {
				safe : true
			}, function(err, result) {
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
	 */
	destroy : function(req, res) {
		var id = req.params.id;
		Resource.log(Resource.name + ':destroy -' + id);
		db.collection(Resource.name, function(err, collection) {
			collection.remove({
				'_id' : new BSON.ObjectID(id)
			}, {
				safe : true
			}, function(err, result) {
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
	}
};

var mongo = require('mongodb'), Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;
var server = new Server(Resource.host, Resource.port, {
	auto_reconnect : true,
	safe : false
});
var db = new Db(Resource.databaseName, server);

/**
 * Open the database and check for collection, if none
 * then create it with the schema.
 */
db.open(function(err, db) {
	if (!err) {
		Resource.log('Connected to ' + Resource.databaseName);
		db.collection(Resource.name, {
			safe : true
		}, function(err, collection) {
			if (err) {
				Resource.log('The collection doesnt exist. creating it with sample data...');
				Resource.populateDb();
			}
		});
	}
});


