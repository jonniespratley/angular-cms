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
var crypto = require('crypto');
var path = require('path');
var express = require('express');
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulatio
var util = require('util');
var request = require('request');

var sio = require('socket.io');
var Deferred = require("promised-io/promise").Deferred;
var when = require("promised-io/promise");
var bodyParser = require('body-parser');
var busboy = require('connect-busboy'); //middleware for form/file upload
var markdown = require("markdown").markdown;


//Strings for results
var MESSAGES = {
	USER_REGISTRATION_ERROR: 'There was an error, please try again.',
	USER_REGISTRATION_SUCCESS: 'New user successfully registered.',
	USER_REGISTRATION_EXISTS: 'User already in exists.'

};
var DS = require('jps-ds').DS;
var _ds = new DS({
	host: 'angularcms:angularcms@paulo.mongohq.com:10089/app19632340',
	//host: 'localhost/angular-cms',
	models: {
		'groups': {
			title: String,
			body: String,
			slug: String,
			created: Date,
			updated: Date
		},
		'users': {
			id: String,
			provider: String,
			displayName: String,
			name: Object,
			emails: Array,
			photos: Array,
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
			image: Object,
			type: String,
			published: Boolean,
			created: Date,
			updated: Date,
			status: Object,
			parent: Object,
			template: Object,
			order: Number,
			meta: Object
		},
		'pages': {
			title: String,
			body: String,
			image: Object,
			type: String,
			published: Boolean,
			created: Date,
			updated: Date,
			status: Object,
			parent: Object,
			template: Object,
			order: Number,
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
	log: function () {
		console.log(util.inspect(arguments, {colors: true}));

	},
	//### index
	//I handle displaying a message with the version for this api.
	index: function (req, res, next) {
		res.json({
			message: 'REST API Server ' + RestResource.useversion
		});
	},

	//### get
	//I handle gathering records dynamically from a call to the v2 api.
	get: function (req, res, next) {
		if (req.param('id')) {
			console.log('find one', req.params.id);
			_ds.findOne(req.params.collection, req.params.id).then(function (data) {
				res.send(data);
			}, function (err) {
				res.send(err);
			});
		} else {
			_ds.findAll(req.params.collection).then(function (data) {
				res.send(data);
			}, function (err) {
				res.send(err);
			});
		}
	},
	//### add
	//I handle adding a record to the database.
	add: function (req, res, next) {
		_ds.create(req.params.collection, req.body).then(function (data) {
			console.warn('create', data);
			res.send(data);
		}, function (err) {
			res.send(err);
		});
	},
	//### edit
	//I handle
	edit: function (req, res, next) {
		var data = req.body;
		delete data._id;
		_ds.update(req.params.collection, req.params.id, data).then(function (data) {
			console.warn(data);
			res.send(data);
		}, function (err) {
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
		_ds.destroy(req.params.collection, req.params.id).then(function (data) {
			console.warn(data);
			res.send(data);
		}, function (err) {
			res.send(err);
		});
	},
	readme: function (res, req) {
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
	},
	plugins: function (req, res) {
		var result = fs.readdir('./app/cms-plugins', function (err, files) {
			console.log(files);
			res.header('Content-Type', 'application/json');
			res.jsonp(200, files);
		});
	}
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


module.exports = RestResource;
