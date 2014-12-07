var passport = require('passport'),
	express = require('express'),
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google').Strategy,
	log = require('npmlog'),
	path = require('path'),
	flash = require('express-flash'),
	DS = require('jps-ds').DS;


var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = [
	{id: 1, username: 'admin', password: 'admin', email: 'admin@gmail.com'},
	{id: 2, username: 'test', password: 'test', email: 'test@gmail.com'},
	{id: 3, username: 'jonniespratley', password: 'fred', email: 'jonniespratley@gmail.com'}

];


var User = function(){

};

User.findOrCreate = function(profile, fn){
	console.warn('findOrCreate', profile);
	User.findByEmail(profile.emails[0], function(err, user){
		fn(user);
	});
};
User.findById = function(id, fn) {
	var idx = id - 1;
	console.warn('findById', id);
	if (users[idx]) {
		fn(null, users[idx]);
	} else {
		fn(new Error('User ' + id + ' does not exist'));
	}
}

User.findByUsername = function(username, fn) {
	console.warn('findByUsername', username);
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
			return fn(null, user);
		}
	}
	return fn(null, null);
}

User.findByEmail = function(email, fn) {
	console.warn('findByEmail', email);
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.email === email) {
			return fn(null, user);
		}
	}
	return fn(null, null);
}




function cmsAuth(options, app) {
	var self = this;
	if (!app) {
		throw new Error('Must provide express application!');
	}

	console.warn('cmsAuth', options);

	self._ds = DS;

	var baseUrl = options.host + ':' + options.port;










// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.

	passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
/*
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
	*/
/**/
	passport.use(new GoogleStrategy({
			returnURL: 'http://localhost:8181/auth/google/return', realm: 'http://localhost:8181/'
		},
		function (identifier, profile, done) {
			console.warn( 'googleCallback', profile);
			profile.openId = identifier;
			User.findOrCreate(profile, function(err, user) {
      	done(err, user);
    	});
		}
	));


	//Setup
	app.configure(function () {
	  app.use(express.logger());
		app.use(express.static(path.resolve(__dirname, '../www')));
		app.set('views', path.resolve(__dirname, '../www'));
		app.set('view engine', 'ejs');
		app.engine('ejs', require('ejs-locals'));
	  app.use(express.cookieParser());
	  app.use(express.methodOverride());
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(bodyParser.json());
		app.use("jsonp callback", true);
		app.use(flash());
		app.use(session({
	  	secret: 'angular-cms',
	  	resave: true,
	  	saveUninitialized: true
		}));
		app.use(passport.initialize());
		app.use(passport.session());

		app.use(app.router);


	});



	app.all('*', function (req, res, next) {
		console.warn('cmsAuth', req.params);
		next();
	});

	app.get('/', function(req, res){
  	res.render('index', { user: req.user, message: 'Please login', status: 'info' });
	});

	app.get('/account', ensureAuthenticated, function(req, res){
	  res.render('account', { user: req.user });
	});

	app.get('/login', function(req, res){
	  res.render('login', { user: req.user, message: 'Please login', status: 'warning' });
	});

	app.post('/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) {
				return next(err)
			}
	    if (!user) {
	      //req.flash('error', info.message);
	      return res.redirect('/login')
	    }
	    req.logIn(user, function(err) {
	      if (err) {
					return next(err);
					}
	      return res.redirect('/users/' + user.username);
	    });
	  })(req, res, next);
	});


	app.get('/auth/user', ensureAuthenticated, function (req, res) {
		res.json(200, req.user);
	});

	app.get('/auth/logout', function (req, res) {
		req.logout();
		res.redirect(options.apiBase);
	});


	// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return',
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));
	app.get('/auth/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});


	return app;
};


module.exports = cmsAuth;
