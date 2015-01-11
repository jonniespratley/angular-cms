var mongoose = require('mongoose');

module.exports = function(config) {
	console.warn('cms-db initialized');
	try {
		mongoose.connect(config.db.url);
	} catch (err) {
		throw new Error('Unable to connect to MongoDB at ' + config.db.url);
	}

	// CONNECTION EVENTS
	// When successfully connected
	mongoose.connection.on('connected', function() {
		console.log('Mongoose default connection open to ', config.db.url);
	});

	// If the connection throws an error
	mongoose.connection.on('error', function(err) {
		console.log('Mongoose default connection error: ' + err);
	});

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose default connection disconnected');
	});

	// If the Node process ends, close the Mongoose connection
	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose default connection disconnected through app termination');
			process.exit(0);
		});
	});

}; 