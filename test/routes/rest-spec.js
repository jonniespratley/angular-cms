/**
 * Created by jonniespratley on 11/27/14.
 */
var app, endpoint, expect, postData, request, rest;

request = require('supertest');
expect = require('chai').expect;

rest = require('../../routes/rest').rest;

app = rest.init({
	port: 9191,
	'staticDir': '/dist',
	'publicDir': '/app',
	'uploadsTmpDir': '/.tmp',
	'uploadsDestDir': '/www/cms-content/uploads',
	'uploadsUrl': ':8181/cms-content/',
	'logFormat': '[:date] - [:method] - :url - :status - :response-time ms',
	'db': {
		'name': 'angular-cms',
		'username': 'amadmin',
		'password': 'fred',
		'host': 'localhost',
		'port': 27017
	}
});

endpoint = 'http://localhost:8181/api/v2';

postData = {
	'username': 'nodetest' + Date.now(),
	'email': 'nodetest@email.com',
	'password': 'test',
	'active': true,
	'groups': ['member'],
	'_activation': '',
	'_key': '',
	'created': new Date(),
	'modified': new Date(),
	'metadata': {
		'avatar': '',
		'name': 'Node Test User'
	}
};

describe('Testing: API Server', function () {
	describe('GET /users', function () {
		it('respond with json', function (done) {
			request(app)
				.get('/api/v2/angular-cms/users')
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
	});
});
