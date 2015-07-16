var express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	RestResource = require('./rest');

module.exports = function(config, app) {
	'use strict';
	var router = express.Router();

	router.use(function(req, res, next) {
		console.log('cms-rest Time:', Date.now(), req.params, req.method, req.body);
		next();
	});

	router.get(config.apiBase, RestResource.index);
	router.get(config.apiBase + '/plugins', RestResource.plugins);
	router.get(config.apiBase + '/readme', RestResource.readme);

	//Dynamic REST
	router.get(config.apiBase + '/:db/:id?', RestResource.get);
	router.post(config.apiBase + '/:db/:id?', bodyParser.json(), RestResource.add);
	router.put(config.apiBase + '/:db/:id?', bodyParser.json(), RestResource.edit);
	router.delete(config.apiBase + '/:db/:id?', RestResource.destroy);

	console.warn('cms-rest', 'initialized');

	app.use('/', router);
};
