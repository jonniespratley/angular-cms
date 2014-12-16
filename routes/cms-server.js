var express = require('express'),
		path = require('path'),
		bodyParser = require( 'body-parser' );

module.exports = function (config, app) {
	console.warn( 'cms-server initialized');

	var router = express.Router();

	var options = {
		dotfiles: 'ignore',
		etag: false,
		extensions: ['png', 'html', 'jpeg', 'jpg', 'gif', 'css'],
		index: true,
		maxAge: '1d',
		redirect: false,
		setHeaders: function (res, path) {
			res.set('x-timestamp', Date.now())
		}
	};

	router.use(express.static(config.staticDir, options));
	
	router.use('/', function(res, req, next){
		req.send(config.publicDir + path.sep + 'index.html');
		next();
	});

	app.use('/', router);

};
