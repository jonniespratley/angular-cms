var util = require('util');
var express = require('express');

module.exports = function(config, app) {
	'use strict';
	var router = express.Router();
	router.use(function(req, res, next) {
		console.log('cms-router Time:', Date.now());
		next();
	});

	//Fix for cloud foundry
	if (process.env.VCAP_APP_PORT) {
		config.port = process.env.VCAP_APP_PORT;
	}

	// TODO: Using pouchdb
	var PouchDB = require('pouchdb');
	PouchDB.debug('*');
	var db = new PouchDB(config.db.local);
	var db2 = new PouchDB(config.db.remote);
	PouchDB.sync(db, db2);
	app.locals.db = db;

	console.log('Connected to', config.db.local);

// TODO:

/*
router.route('/users/:user_id')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  next();
})
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  // just an example of maybe updating the user
  req.user.name = req.params.name;
  // save user ... etc
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
})


var replication = PouchDB.replicate('mydb', 'http://localhost:5984/mydb', {live: true})
  .on('change', function (info) {
    // handle change
  }).on('complete', function (info) {
    // handle complete
  }).on('uptodate', function (info) {
    // handle up-to-date
  }).on('error', function (err) {
    // handle error
  });

replication.cancel(); // whenever you want to cancel
*/

	var serverPort = process.env.PORT || config.port;
	var serverHost = process.env.IP || config.host;


	require('./cms-db')(config);
	require('./cms-auth')(config, app);
	//	require('./cms-passport')(config, app);
	//require('./cms-upload')(config, app);
	require('./cms-server')(config, app);
	require('./cms-rest')(config, app);
	//require('./cms-proxy')(config, app);
	//require('./cms-sockets')(config, server);

	this.mount = function() {
		console.warn('cms-router', 'mounted');

		app.use('/', router);
	};

};
