var request = require('supertest');
var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var express = require('express');
var app = express();
var config = JSON.parse(fs.readFileSync(process.cwd() + '/config/config.json'));
config.port = 9191


var cmsRoutes = require(process.cwd() + '/routes/cms-routes');
cmsRoutes.mount(config, app);

app.listen(9292);

var endpoint = 'http://localhost:8181/api/v2';
var username =  "nodetest" + Date.now();
var postData = {
	"username": username,
	"email": username + "@email.com",
	"password": "test",
	"active": true,
	"groups": ["member"],
	"metadata": {
		"avatar": "",
		"name": "Node Test User"
	}
};



describe('Testing: API Server', function () {

	it('POST - /api/v2/users/register - should return user on successful registation', function (done) {
		request(app)
			.post('/api/v2/register')
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

	it('POST - /api/v2/users/login - should return user on successful login', function (done) {
		var validUser = {
			username: 'test@gmail.com',
			password: 'test'
		};
		request(app)
			.post('/api/v2/login')
			.send(validUser)
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
	it('POST - /api/v2/users/login - should return false on unsuccessful login', function (done) {
		var invalidUser = {
			username: 'test1',
			password: 'wrongpassword'
		};
		request(app)
			.post('/api/v2/login')
			.send(invalidUser)
			.expect("Content-Type", /json/)
			.expect(404, done);
	});

});
