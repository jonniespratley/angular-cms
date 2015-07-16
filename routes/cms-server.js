var express = require('express'),
	path = require('path'),
	serveStatic = require('serve-static'),
	finalhandler = require('finalhandler'),
	bodyParser = require('body-parser');


module.exports = function(config, app) {
	console.warn('cms-server initialized');

	var router = express.Router();

	var options = {
		dotfiles: 'ignore',
		etag: false,
		extensions: [
			'js',
			'png',
			'html', 'jpeg', 'jpg', 'gif',
			'css'
		],
		index: true,
		maxAge: '1d',
		redirect: false,
		setHeaders: function(res, path) {
			res.set('x-timestamp', Date.now());
		}
	};



	router.all('/', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
		next();
		console.log('cms-server', req.method);
	});


	app.use('/', router);

};
