var http = require('http'), util = require('util');

module.exports.mount = function(config, app) {
	'use strict';
	
	//Fix for cloud foundry
	if(process.env.VCAP_APP_PORT ){
		config.port = process.env.VCAP_APP_PORT;
	}
	

	var server = http.createServer(app);
	var serverPort = process.env.PORT || config.port;
	var serverHost = process.env.IP || config.host;

	require('./cms-db')(config);
	require('./cms-auth')(config, app);
	require('./cms-passport')(config, app);
	require('./cms-upload')(config, app);
	require('./cms-rest')(config, app);
	require('./cms-proxy')(config, app);
	require('./cms-server')(config, app);
	require('./cms-sockets')(config, server);
	
	
	
	
	

	server.listen(config.port, function() {
		util.log('App listening on port: ' + config.port + ''.verbose);
	});
};
