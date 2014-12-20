/* global define */
define([
	'intern!object',
	'intern/chai!expect',
	'intern/dojo/node!path',
	'intern/dojo/node!fs',
	'intern/dojo/node!supertest',
	'intern/dojo/node!express',
	'intern/dojo/node!../../routes/cms-passport',
], function (registerSuite, expect, path, fs, request, express, cmsPassport) {
	'use strict';


	var app = express();
	var config = JSON.parse(fs.readFileSync(process.cwd() + '/config/config.json'));
			config.port = 9191;

	cmsPassport(config, app);


	registerSuite({
		name: 'cms-passport',
		'should have /proxy route': function () {
			this.skip();
		},
		'should have a /auth/google/callback route': function () {
			this.skip();
		},
		'should have a /auth/google route': function () {
			this.skip();
		},
		'should have /auth/me route': function () {
			this.skip();
		},
		'should have /auth/register route': function () {
			this.skip();
		},
		'POST - /register - should return user on successful registration': function () {

			var dfd = this.async();
			request(app)
				.post('/auth/register')
				.send({
					"username": Date.now() + "test@email.com",
					"email": Date.now() + "test@email.com",
					"password": "test",
					"metadata": {
						"avatar": "",
						"name": "Jonnie Dollas"
					}
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(201, dfd.resolve());
		},
		'POST - /login - should return user on successful login': function () {
			var dfd = this.async();
			var validUser = {
				username: 'test@gmail.com',
				password: 'test'
			};
			request(app)
				.post('/auth/login')
				.send(validUser)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res){
					if (err) {throw err;}
						console.log(res.body);
						dfd.callback(res);
				});
		}
	});
});
