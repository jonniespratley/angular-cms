var passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google').Strategy,
	express = require('express'),
	path = require('path'),
	q = require('q'),
	flash = require('connect-flash'),
	User = require('./models/user'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	util = require('util'),
	User = require('./models/user'),
	session = require('express-session'),
	crypto = require('crypto'),
	bcrypt = require('bcrypt-nodejs');
/**
 * I handle ensuring a user is authenticated.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
var ensureAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

/**
 * I am the cmsPassport module that has various ways of
 * authenticating a user.
 * @param config - Configuration settings
 * @param app - Express app
 */
var cmsPassport = function (config, app) {

var user = new User();

	if (!app) {
		throw new Error('Must provide express application!');
	}

	/*

	*/
	var findOrCreate = function(u, done){
		console.log('find', u);

		for (var i = 0; i < u.emails.length; i++) {
			var email = u.emails[i].value
			User.findOne({ email: email }, function (err, user) {
				if (err) { return done(err); }
				if (!user) {
					console.warn('create user', u);
					return done(null, false);
				}
					return done(null, user);
				});
		}

	};

	/**
	 * I handle serializing a user.
	 * @param user
	 * @param done
	 */
	var serializeUser = function (user, done) {
		done(null, user._id);
	};

	/**
	 * I handle deserializing a user.
	 * @param id
	 * @param done
	 */
	var deserializeUser = function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	};

	passport.serializeUser(serializeUser);

	passport.deserializeUser(deserializeUser);

var strategy = function(username, password, done) {
	console.warn('find user', username, password);
	User.findOne({ username: username }, function (err, user) {
		if (err) { return done(err); }
			if (!user) { return done(null, false); }
				if (!user.validPassword(password)) { return done(null, false); }
					return done(null, user);
				});
			};

	passport.use(new BasicStrategy(strategy));
	passport.use(new LocalStrategy(strategy));

	passport.use(new GoogleStrategy({
			returnURL: 'http://localhost:8181/auth/google/return',
			realm: 'http://localhost:8181/'
		},
		function (identifier, profile, done) {
			console.warn('googleCallback', profile);
			profile.openId = identifier;
			findOrCreate(profile, function (err, user) {
				done(err, user);
			});
		}
	));

	app.use(express.static(path.resolve(__dirname, '../www')));
	app.set('views', path.resolve(__dirname, '../www'));
	app.set('view engine', 'ejs');
	app.engine('ejs', require('ejs-locals'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	app.use(session({
		secret: 'angular-cms',
		resave: true,
		saveUninitialized: true
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());


	app.get('/api/me', passport.authenticate('basic', {session: false}), function (req, res) {
		res.json(req.user);
	});

	app.all('*', function (req, res, next) {
		req.config = JSON.stringify(config);
		console.warn('cmsAuth', req.params);
		next();
	});

	app.get('/', function (req, res) {
		res.render('index', {user: req.user, message: 'Please login', status: 'info'});
	});

	app.get('/account', ensureAuthenticated, function (req, res) {
		res.render('account', {
			user: req.user,
			config: req.config
		});
	});

	app.get('/login', function (req, res) {
		res.render('login', {user: req.user, message: 'Please login', status: 'warning'});
	});

	app.post('/login',
		passport.authenticate('local', {
			successRedirect: '/account',
			failureRedirect: '/login',
			failureFlash: false
		})
	);

	app.get('/auth/user', ensureAuthenticated, function (req, res) {
		res.json(200, req.user);
	});

	app.get('/auth/logout', function (req, res) {
		req.logout();
		res.redirect(options.apiBase);
	});

	app.get('/auth/google', passport.authenticate('google'));
	app.get('/auth/google/return',
		passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));


};


module.exports = cmsPassport;
