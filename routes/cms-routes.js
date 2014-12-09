module.exports.mount = function (config, app) {
	require( './cms-auth' )( config, app );
	require( './cms-passport' )( config, app );
	require( './cms-rest' )( config, app );
	require( './cms-proxy' )( config, app );
	require( './cms-sockets' )( config, app );
	require( './cms-server' )( config, app );
	require( './cms-upload' )( config, app );
};
