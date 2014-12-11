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
			config.port = 9191

	cmsPassport(config, app);


	registerSuite({
		name: 'cms-passport',
		'should have /proxy route': function () {
		},
		'should have a /auth/google/callback route': function () {
		},
		'should have a /auth/google route': function () {
		},
		'should have /auth/me route': function () {
		},
		'should have /auth/register route': function () {
		},
		'POST - /register - should return user on successful registration': function () {
			var dfd = this.async();
			request(app)
				.post('/register')
				.send({
					"username": Date.now() + "test@email.com",
					"email": Date.now() + "test@email.com",
					"password": "test",
					"metadata": {
						"avatar": "",
						"name": "Jonnie Dollas"
					}
				})
				.expect("Content-Type", /json/)
				.expect(201, dfd.resolve);
		},
		'POST - /login - should return user on successful login': function () {
			var dfd = this.async();
			var validUser = {
				username: 'test@email.com',
				password: 'test'
			};
			request(app)
				.post('/login')
				.send(validUser)
				.expect("Content-Type", /json/)
				.expect(200, dfd.resolve);
		}
	});
});
