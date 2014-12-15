var mongoose = require('mongoose'), http = require('http'), util = require('util');

module.exports.mount = function (config, app) {
	'use strict';

	//Connect to database
	mongoose.connect(config.mongodb);

	// CONNECTION EVENTS
// When successfully connected
	mongoose.connection.on('connected', function () {
		console.log('Mongoose default connection open to ' + dbURI);
	});

// If the connection throws an error
	mongoose.connection.on('error',function (err) {
		console.log('Mongoose default connection error: ' + err);
	});

// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose default connection disconnected');
	});

// If the Node process ends, close the Mongoose connection
	process.on('SIGINT', function() {
		mongoose.connection.close(function () {
			console.log('Mongoose default connection disconnected through app termination');
			process.exit(0);
		});
	});

	var server = http.createServer(app);

	require( './cms-auth' )( config, app );
	require( './cms-passport' )( config, app );
	require( './cms-rest' )( config, app );
	require( './cms-proxy' )( config, app );
	require( './cms-upload' )( config, app );
	require( './cms-sockets' )( config, server );
	require( './cms-server' )( config, app );



	return server.listen(config.port || process.env.PORT, function () {
		util.log('App listening on port: ' + config.port + ''.verbose);
		util.log(util.inspect(config, {colors: true}));
	});
};
