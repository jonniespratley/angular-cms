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
var crypto = require('crypto'),
	express = require('express'),
	path = require('path'),
	fs = require('fs-extra'),
	util = require('util'),
	request = require('request');
var Deferred = require("promised-io/promise").Deferred,
	when = require("promised-io/promise"),
	bodyParser = require('body-parser'),
	busboy = require('connect-busboy'),
	markdown = require("markdown").markdown;


//Strings for results
var MESSAGES = {
	USER_REGISTRATION_ERROR: 'There was an error, please try again.',
	USER_REGISTRATION_SUCCESS: 'New user successfully registered.',
	USER_REGISTRATION_EXISTS: 'User already in exists.'

};
var config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/config.json')));



// TODO: Using pouchdb
var PouchDB = require('pouchdb');
PouchDB.debug('*');
var db = new PouchDB(config.db.local);
var _ds = {
	findOne: function(id, params) {
		return db.get(id, params);
	},
	findAll: function(params) {
		return db.allDocs(params);
	},
	create: function(id, data) {
		return db.put(data, id);
	},
	update: function(id, data) {
		return db.get(id).then(function(resp) {
			data._rev = resp._rev;
			return db.put(data, id);
		})
	},
	remove: function(id) {
		return db.get(id).then(function(resp) {
			return db.remove(resp);
		})
	}
};



function delay(ms, value) {
	var deferred = new Deferred();
	setTimeout(function() {
		deferred.resolve(value);
	}, ms);
	return deferred.promise;
}

//### hashPassword
//Hash password using basic sha1 hash.
var hashPassword = function(pass, salt) {
	var shasum = crypto.createHash('sha1');
	shasum.update(salt + pass);

	return shasum.digest('hex');
}

//## Configuration


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
	init: function(config) {
		this.config = config;
		return this;
	},
	useversion: 'v2',
	urls: {
		v1: 'https://www..com',
		v2: '/api/v2/'
	},
	log: function() {
		console.log(util.inspect(arguments, {
			colors: true
		}));

	},
	//### index
	//I handle displaying a message with the version for this api.
	index: function(req, res, next) {
		res.json({
			message: 'REST API Server ' + RestResource.useversion
		});
	},

	//### get
	//I handle gathering records dynamically from a call to the v2 api.
	get: function(req, res, next) {
		if (req.params.id) {
			console.log('find one', req.params.id);
			_ds.findOne(req.params.id, req.params).then(function(data) {
				res.send(data);
			}, function(err) {
				res.send(err);
			});
		} else {
			_ds.findAll(req.params).then(function(data) {
				res.send(data);
			}, function(err) {
				res.send(err);
			});
		}
	},
	//### add
	//I handle adding a record to the database.
	add: function(req, res, next) {
		_ds.create(req.body).then(function(data) {
			console.warn('create', data);
			res.send(data);
		}, function(err) {
			res.send(err);
		});
	},
	//### edit
	//I handle
	edit: function(req, res, next) {
		var data = req.body;
		delete data._id;
		_ds.update(req.params.id, data).then(function(data) {
			console.warn(data);
			res.send(data);
		}, function(err) {
			res.send(err);
		});
	},
	//### view
	//I handle
	view: function(req, res, next) {},
	//### destroy
	//I handle
	destroy: function(req, res, next) {
		_ds.destroy(req.params.id).then(function(data) {
			console.warn(data);
			res.send(data);
		}, function(err) {
			res.send(err);
		});
	},
	readme: function(res, req) {
		var localPath = __dirname + '/../README.md';
		fs.readFile(localPath, 'utf8', function(err, data) {
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
	},
	plugins: function(req, res) {
		var result = fs.readdir('./app/cms-plugins', function(err, files) {
			console.log(files);
			res.header('Content-Type', 'application/json');
			res.jsonp(200, files);
		});
	}
};


//### getFile
//Get file contents from a file.
function getFile(localPath, mimeType, res) {
	fs.readFile(localPath, 'utf8', function(err, data) {
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
	stream = fs.createWriteStream(localPath);
	console.log('writeFile', localPath);
	stream.on("open", function() {
		// write to and close the stream at the same time
		stream.end(contents, 'utf-8');
		res.end(html);
	});
};


module.exports = RestResource;
