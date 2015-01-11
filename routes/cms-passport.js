var passport = require('passport'), BasicStrategy = require('passport-http').BasicStrategy, LocalStrategy = require('passport-local').Strategy, GoogleStrategy = require('passport-google').Strategy, express = require('express'), path = require('path'), q = require('q'), flash = require('connect-flash'), User = require('./models/user'), cookieParser = require('cookie-parser'), bodyParser = require('body-parser'), session = require('express-session'), mongoose = require('mongoose'), util = require('util'), User = require('./models/user'), session = require('express-session'), crypto = require('crypto'), bcrypt = require('bcrypt-nodejs');

//Hash password using basic sha1 hash.
var hashPassword = function(pass, salt) {
	return bcrypt.hashSync(pass);
};
/**
 * I handle ensuring a user is authenticated.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
var ensureAuthenticated = function(req, res, next) {
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
var cmsPassport = function(config, app) {

	var user = new User();

	if (!app) {
		throw new Error('Must provide express application!');
	}

	/**
	 * I handle finding or creating a user.
	 */
	var findOrCreate = function(u, done) {
		console.log('find', u);

		for (var i = 0; i < u.emails.length; i++) {
			var email = u.emails[i].value;
			
			User.findOne({
				email : email
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				
				if (!user) {
					console.warn('create user', u);
					return done(null, false);
				} else {
					user.google = u;
					user.update( { username: user.username }, user, function(){
						console.warn('update user', u);
						done(null, user);	
					} );
						
				}
				
			});
		}

	};

	var registerUser = function(req, res, next) {
		var data = req.body;

		//TODO: Need to make this externalized.
		if (req.body.username) {
			data.username = req.body.username;
		}
		if (req.body.email) {
			data.email = req.body.email;
		}

		data.password = hashPassword(req.body.password, data.username);
		data.created_at = new Date();
		data.updated_at = new Date();
		data.active = false;
		data.groups = ['public'];

		console.warn('trying to register', data);

		User.find({
			username : data.username
		}, function(err, u) {
			console.log('found user', err, util.inspect(u, {
				colors : true
			}));

			var user = new User(data);

			if (err) {
				res.jsonp(400, {
					message : 'Problem registering!'
				});
			}

			if (u.length) {
				res.jsonp(400, {
					message : 'Username already exists!'
				});
			} else {
				user.save(function(er, ok) {
					if (er) {
						return res.jsonp(400, {
							message : 'Problem registering!'
						});
					} else {
						return res.jsonp(201, ok);
					}
				});
			}

		});
	};

	/**
	 * I handle serializing a user.
	 * @param user
	 * @param done
	 */
	var serializeUser = function(user, done) {
		done(null, user._id);
	};

	/**
	 * I handle deserializing a user.
	 * @param id
	 * @param done
	 */
	var deserializeUser = function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	};

	passport.serializeUser(serializeUser);

	passport.deserializeUser(deserializeUser);

	var strategy = function(username, password, done) {
		console.warn('find user', username, password);
		User.findOne({
			username : username
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			if (!user.validPassword(password)) {
				return done(null, false);
			}
			return done(null, user);
		});
	};

	passport.use(new BasicStrategy(strategy));
	passport.use(new LocalStrategy(strategy));

	passport.use(new GoogleStrategy({
		returnURL : config.host + ':' + config.port + '/auth/google/return',
		realm : config.host + ':' + config.port
	}, function(identifier, profile, done) {
		console.warn('googleCallback', profile);
		profile.openId = identifier;
		findOrCreate(profile, function(err, user) {
			done(err, user);
		});
	}));

	/**
	 * TODO: Handle configuring passport
	 *
	 */
	app.use(express.static(path.resolve(config.publicDir)));
	app.set('views', path.resolve(config.publicDir));
	app.set('view engine', 'ejs');
	app.engine('ejs', require('ejs-locals'));

	app.use(cookieParser());
	app.use(bodyParser.urlencoded({
		extended : false
	}));
	app.use(bodyParser.json());
	app.use(session({
		secret : 'angular-cms',
		resave : true,
		saveUninitialized : true
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	app.get('/api/me', passport.authenticate('basic', {
		session : false
	}), function(req, res) {
		res.json(req.user);
	});

	app.all('*', function(req, res, next) {
		req.config = JSON.stringify(config);
		console.warn('cmsAuth', req.params);
		next();
	});

	app.get('/', function(req, res) {
		res.render('index', {
			user : req.user,
			message : 'Please login',
			status : 'info'
		});
	});

	app.get('/account', ensureAuthenticated, function(req, res) {
		res.render('account', {
			user : req.user,
			config : req.config
		});
	});

	app.get('/login', function(req, res) {
		res.render('login', {
			user : req.user,
			message : 'Please login',
			status : 'warning'
		});
	});

	app.get('/register', function(req, res) {
		res.render('register');
	});

	app.post('/register', registerUser);

	app.post('/login', passport.authenticate('local', {
		successRedirect : '/account',
		failureRedirect : '/login',
		failureFlash : false
	}));

	app.get('/auth/user', ensureAuthenticated, function(req, res) {
		res.json(200, req.user);
	});

	app.get('/auth/logout', function(req, res) {
		req.logout();
		res.redirect(options.apiBase);
	});

	app.get('/auth/google', passport.authenticate('google'));
	app.get('/auth/google/return', passport.authenticate('google', {
		successRedirect : '/account',
		failureRedirect : '/login'
	}));

};

module.exports = cmsPassport;
