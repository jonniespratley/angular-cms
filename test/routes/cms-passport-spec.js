"use strict";
var request = require('supertest');
var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var express = require('express');
var app = express();
var config = JSON.parse(fs.readFileSync(process.cwd() + '/config/config.json'));
config.port = 9191

var cmsPassport = require(process.cwd() + '/routes/cms-passport')(config, app);
describe('cms-passport', function () {
	it('should have /account route', function (done) {
		done();
	});
	it('should have /auth/login route', function (done) {
		//

		it('POST - /login - should return user on successful login', function (done) {
			var validUser = {
				username: 'test@email.com',
				password: 'test'
			};
			request(app)
			.post('/login')
			.send(validUser)
			.expect("Content-Type", /json/)
			.expect(200, done);
		});
	});

	it('POST - /register - should return user on successful registation', function (done) {
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
		.expect(201, done);
	});
	it('should have /auth/register route', function (done) {
		//
		done();
	});
	it('should have /auth/me route', function (done) {
		//
		done();
	});

	describe('Google Auth', function () {
		it('should have a /auth/google route', function (done) {
			//
			done();
		});
		it('should have a /auth/google/callback route', function (done) {
			//
			done();
		});
	});

});
