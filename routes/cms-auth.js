var bodyParser = require('body-parser'),

	util = require('util'),
	session = require('express-session'),
	crypto = require('crypto'),
	bcrypt = require('bcrypt-nodejs');

var cmsAuth = function(config, app) {
	console.warn('cms-auth initialized');

	//### hashPassword
	//Hash password using basic sha1 hash.
	var hashPassword = function(pass, salt) {
		return bcrypt.hashSync(pass);
	};

	var UserModel = require('./models/user');
var User = new UserModel(config, app);
	var cmsAuth = {
		/**
		 * //### login
		 //I handle trying to authorized a user with the v1 api server.
		 * @param req
		 * @param res
		 * @param next
		 */
		login: function(req, res, next) {
			var query = {};
			if (req.body.username) {
				query.username = req.body.username;
			}
			if (req.body.email) {
				query.username = req.body.email;
			}
			query.password = hashPassword(req.body.password, query.username);
			console.warn('trying to login', query);

			query._id = 'user-'+ query.username;

			app.locals.db.get(query._id).then(function(resp){
				console.log('found user', resp);
				res.status(200).json(resp);
			}).catch(function(err){
				console.log('No user so creating');
				res.status(404).json(err);
			});


			/*

			User.findOne({
				username: query.username
			}, function(err, data) {
				if (err) {
					return res.json(400, err);
				}
				try {
					if (data && bcrypt.compareSync(req.body.password, data.password)) {
						req.session.user = data;
						return res.json(200, data);
					} else {
						return res.json(404, {
							message: 'Wrong username/password!'
						});
					}
				} catch (error) {
					return res.json(404, {
						message: error
					});
				}
			});
			*/
		},
		/**
		 * Handle registering a new user
		 * @param req
		 * @param res
		 * @param next
		 */
		register: function(req, res, next) {
			var data = req.body;

			//TODO: Need to make this externalized.
			if (req.body.username) {
				data.username = req.body.username;
			}
			if (req.body.email) {
				data.email = req.body.email;
			}
			data._id = 'user-'+ data.username;
			data.password = hashPassword(req.body.password, data.username);
			data.created_at = new Date();
			data.updated_at = new Date();
			data.active = false;
			data.groups = ['public'];

			console.warn('trying to register', data);

			app.locals.db.get(data._id).then(function(resp){
				console.log('found user', resp);
				res.status(404).json({
					message: 'User already exists'
				});
			}).catch(function(err){
				console.log('No user so creating');
				app.locals.db.put(data).then(function(resp){
					res.status(201).json(resp);
				});
			})




/*
			//Try and find user
			User.find({
				username: data.username
			}, function(err, u) {
				console.log('found user', err, util.inspect(u, {
					colors: true
				}));
				var user = new User(data);
				if (err) {
					res.json(400, {
						message: 'Problem registering!'
					});
				}

				if (u.length) {
					res.jsonp(400, {
						message: 'Username already exists!'
					});
				} else {
					user.save(function(er, ok) {
						if (er) {
							return res.json(400, {
								message: 'Problem registering!'
							});
						} else {
							return res.jsonp(201, ok);
						}
					});
				}

			});
			*/
		},



		session: function(req, res, next) {
			var user = req.session;
			if (req.session && req.session.user) {
				user = req.session.user;
			}
			console.warn(util.inspect(user, {
				colors: true
			}));
			return res.send({
				message: 'Your session',
				data: user
			});
		}
	};


	app.get(config.apiBase + '/login', bodyParser.json(), cmsAuth.login);
	app.post(config.apiBase + '/login', bodyParser.json(), cmsAuth.login);
	app.post(config.apiBase + '/register', bodyParser.json(), cmsAuth.register);
	app.get(config.apiBase + '/session', bodyParser.json(), cmsAuth.session);
};

module.exports = cmsAuth;
