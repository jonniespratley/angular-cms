var passport = require( 'passport' ),
	BasicStrategy = require( 'passport-http' ).Strategy,
	LocalStrategy = require( 'passport-local' ).Strategy,
	GoogleStrategy = require( 'passport-google' ).Strategy,
	express = require( 'express' ),
	path = require( 'path' ),
	q = require( 'q' ),
	flash = require( 'connect-flash' ),
	User = require( './models/user' ),
	cookieParser = require( 'cookie-parser' ),
	bodyParser = require( 'body-parser' ),
	session = require( 'express-session' );
var ensureAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect( '/login' );
};
module.exports = function (config, app) {

	if (!app) {
		throw new Error( 'Must provide express application!' );
	}

	passport.serializeUser( function (user, done) {
		done( null, user.id );
	} );

	passport.deserializeUser( function (id, done) {
		User.findById( id, function (err, user) {
			done( err, user );
		} );
	} );

	passport.use( new LocalStrategy( {
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		}, function (username, password, done) {
			process.nextTick( function () {
				console.warn( 'find by username' );
				User.findByUsername( username ).then( function (user) {
					return done( null, user );
				}, function (err) {
					return done( null, false );
				} );
			} );
		}
	) );

	passport.use( new GoogleStrategy( {
			returnURL: 'http://localhost:8181/auth/google/return', realm: 'http://localhost:8181/'
		},
		function (identifier, profile, done) {
			console.warn( 'googleCallback', profile );
			profile.openId = identifier;
			User.findOrCreate( profile, function (err, user) {
				done( err, user );
			} );
		}
	) );

	app.use( express.static( path.resolve( __dirname, '../www' ) ) );
	app.set( 'views', path.resolve( __dirname, '../www' ) );
	app.set( 'view engine', 'ejs' );
	app.engine( 'ejs', require( 'ejs-locals' ) );
	app.use( cookieParser() );
	app.use( bodyParser.urlencoded( {extended: false} ) );
	app.use( bodyParser.json() );
	app.use( session( {
		secret: 'angular-cms',
		resave: true,
		saveUninitialized: true
	} ) );
	app.use( passport.initialize() );
	app.use( passport.session() );
	app.use( flash() );

	app.get( '/api/me', passport.authenticate( 'basic', {session: false} ), function (req, res) {
		res.json( req.user );
	} );

	app.all( '*', function (req, res, next) {
		console.warn( 'cmsAuth', req.params );
		next();
	} );

	app.get( '/', function (req, res) {
		res.render( 'index', {user: req.user, message: 'Please login', status: 'info'} );
	} );

	app.get( '/account', ensureAuthenticated, function (req, res) {
		res.render( 'account', {user: req.user} );
	} );

	app.get( '/login', function (req, res) {
		res.render( 'login', {user: req.user, message: 'Please login', status: 'warning'} );
	} );

	app.post( '/login',
		passport.authenticate( 'local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: false
		} )
	);

	app.get( '/auth/user', ensureAuthenticated, function (req, res) {
		res.json( 200, req.user );
	} );

	app.get( '/auth/logout', function (req, res) {
		req.logout();
		res.redirect( options.apiBase );
	} );

	app.get( '/auth/google', passport.authenticate( 'google' ) );
	app.get( '/auth/google/return',
		passport.authenticate( 'google', {
			successRedirect: '/',
			failureRedirect: '/login'
		} ) );

};



