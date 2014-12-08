var bodyParser = require( 'body-parser' ),
	session = require( 'express-session' ),
	RestResource = require( './rest' );

module.exports = function (config, app) {
	'use strict';

	app.get( config.apiBase + '/plugins', RestResource.plugins );
	app.get( config.apiBase + '/readme', RestResource.readme );
	app.get( config.apiBase, RestResource.index );


	//Dynamic REST
	app.get( config.apiBase + '/:db/:collection/:id?', RestResource.get )
	app.post( config.apiBase + '/:db/:collection/:id?', bodyParser.json(), RestResource.add )
	app.put( config.apiBase + '/:db/:collection/:id?', bodyParser.json(), RestResource.edit )
	app.delete( config.apiBase + '/:db/:collection/:id?', RestResource.destroy );

	console.warn( 'cms-rest', 'initialized' );
};
