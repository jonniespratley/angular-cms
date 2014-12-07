var passport = require('passport'),
	express = require('express'),
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google').Strategy,
	log = require('npmlog'),
	flash = require('connect-flash'),
	DS = require('jps-ds').DS;
var cookieParser = require('cookie-parser');

function cmsAuth(options, app) {
	var self = this;
	if (!app) {
		throw new Error('Must provide express application!');
	}

	console.warn('cmsAuth', options);

	self._ds = DS;

	var baseUrl = options.host + ':' + options.port;
	var users = [
		{id: 1, username: 'bob', password: 'secret', email: 'bob@example.com'}
		, {id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com'}
	];

	function findById(id, fn) {
		var idx = id - 1;
		console.log('findById', id);
		if (users[idx]) {

			fn(null, users[idx]);
		} else {
			fn(new Error('User ' + id + ' does not exist'));
		}
	}

	function findByUsername(username, fn) {
		console.log('findByUsername', username);
		for (var i = 0, len = users.length; i < len; i++) {
			var user = users[i];
			if (user.username === username) {
				return fn(null, user);
			}
		}
		return fn(null, null);
	}

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/auth/login');
	}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		findById(id, function (err, user) {
			done(err, user);
		});
	});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
	passport.use(new LocalStrategy(function (username, password, done) {
			// asynchronous verification, for effect...
			process.nextTick(function () {

				// Find the user by username.  If there is no user with the given
				// username, or the password is not correct, set the user to `false` to
				// indicate failure and set a flash message.  Otherwise, return the
				// authenticated `user`.
				findByUsername(username, function (err, user) {
					if (err) {
						return done(err);
					}
					if (!user) {
						return done(null, false, {message: 'Unknown user ' + username});
					}
					if (user.password != password) {
						return done(null, false, {message: 'Invalid password'});
					}
					return done(null, user);
				})
			});
		}
	));

	passport.use(new GoogleStrategy({
			returnURL: 'http://localhost:8181/auth/google/return', realm: 'http://localhost:8181/auth'
		},
		function (identifier, profile, done) {
			profile.identifier = identifier;
			return done(null, profile);
		}
	));


	//Setup
	app.configure(function () {
		app.set('views', __dirname + '/www');
		app.use(flash());
		app.use(cookieParser);
		app.use(passport.initialize());
		app.use(passport.session());

		app.use(express.session({secret: 'angular-cms'}));
	});
	app.all('*', function (req, res, next) {
		console.warn('cmsAuth', req.params);
		next();
	});
	app.get('/auth', function (req, res) {
		if (!req.user) {
		//	res.json(200, {message: 'Please login'});
			res.render('login', { user: req.user, message: req.flash('error') });
		}
	});

	app.get('/account', ensureAuthenticated, function (req, res) {
		res.json(200, {user: req.user});
	});

	app.get('auth/login', function (req, res) {
		res.render('login', { user: req.user, message: req.flash('error') });
	});
	app.get('/auth/user', ensureAuthenticated, function (req, res) {
		res.json(200, req.user);
	});
	app.get('/auth/google/:return?', passport.authenticate('google', {successRedirect: '/auth/account'}));
	app.get('/auth/logout', function (req, res) {
		req.logout();
		res.redirect(options.apiBase);
	});
	app.get('/auth/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});



	app.post('/auth/login',
		passport.authenticate('local', { failureRedirect: '/auth/login', failureFlash: true }),
		function(req, res) {
			res.redirect('/');
		});
	return app;
};


module.exports = cmsAuth;
