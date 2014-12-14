var mongoose = require('mongoose'), http = require('http'), util = require('util');

module.exports.mount = function (config, app) {
	'use strict';

	//Connect to database
	mongoose.connect(config.mongodb);

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
