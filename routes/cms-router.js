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
	app.locals.db = db;


	db.info().then(function(resp) {
		console.log('Connected to', config.db.local, resp);
	});


	var serverPort = process.env.PORT || config.port;
	var serverHost = process.env.IP || config.host;


	require('./cms-db')(config);
	require('./cms-auth')(config, app);
	require('./cms-passport')(config, app);
	require('./cms-upload')(config, app);
	require('./cms-server')(config, app);
	require('./cms-rest')(config, app);
	require('./cms-proxy')(config, app);
	//require('./cms-sockets')(config, server);

	this.mount = function() {
		console.warn('cms-router', 'mounted');

		app.use('/', router);
	};

};
