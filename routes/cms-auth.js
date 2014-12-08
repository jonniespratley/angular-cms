var bodyParser = require( 'body-parser' ),
	mongoose = require( 'mongoose' ),
	User = require( './models/user' ),
	session = require( 'express-session' ),
	crypto = require( 'crypto' );

module.exports = function (config, app) {
	console.warn( 'cms-auth' );

	mongoose.connect( config.mongodb );

//### hashPassword
//Hash password using basic sha1 hash.
	var hashPassword = function (pass) {
		var shasum = crypto.createHash( 'sha1' );
		shasum.update( config.security.salt + pass );

		return shasum.digest( 'hex' );
	};

	var cmsAuth = {
		/**
		 * //### login
		 //I handle trying to authorized a user with the v1 api server.
		 * @param req
		 * @param res
		 * @param next
		 */
		login: function (req, res, next) {
			var query = {};

			//TODO: Need to make this externalized.
			if (req.body.username) {
				query.username = req.body.username;
			}
			if (req.body.email) {
				query.username = req.body.email;
			}

			//TODO: Hashing on client side
			query.password = hashPassword( req.body.password );

			console.warn( 'Login Query: ' + JSON.stringify( query ) + ''.verbose );

			User.findOne( query, function (err, data) {
				if (err) {
					res.jsonp( 400, err );
				}
				if (data) {
					res.jsonp( 200, data );
				} else {
					res.jsonp( 404, {message: 'Wrong username/password!'} );
				}
			} );

		},
		/**
		 * Handle registering a new user
		 * @param req
		 * @param res
		 * @param next
		 */
		register: function (req, res, next) {
			var data = req.body;

			//TODO: Need to make this externalized.
			if (req.body.username) {
				data.username = req.body.username;
			}
			if (req.body.email) {
				data.username = req.body.email;
			}

			//TODO: Hashing on client side
			data.password = hashPassword( req.body.password );

			console.log( String( "Register user" ).debug, data );

			var user = new User( data );

			//Try and find user
			User.find( data, function (err, u) {
				if (u) {
					res.json( 400, {message: 'Username already exists!'} );
				} else {
					user.save( function (err, ok) {
						if (err) {
							res.json( 400, {message: 'Problem registering!'} );
						} else {
							res.json( 200, ok );
						}
					} );
				}

			} );

		},
		session: function (req, res, next) {
		}
	};

	//Always users table
	app.post( config.apiBase + '/users/login', bodyParser.json(), cmsAuth.login );
	app.post( config.apiBase + '/users/register', bodyParser.json(), cmsAuth.register );
	app.post( config.apiBase + '/users/session', bodyParser.json(), cmsAuth.session );
};
