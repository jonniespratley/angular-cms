var app, endpoint, expect, path, postData, request, rest;
request = require('supertest');
path = require('path');
fs = require('fs');
expect = require('chai').expect;

var config = JSON.parse(fs.readFileSync(process.cwd() + '/config/config.json'));
config.port = 9191
var cmsAuth = require(process.cwd() + '/routes/cms-auth');
var cmsRest = require(process.cwd() + '/routes/rest');
var rest = new cmsRest(config);
var auth = new cmsAuth(config, rest);
auth.listen(config.port || process.env.PORT, function () {
	console.log(String('Node.js REST server listening on port: ' + config.port).verbose);
});

endpoint = 'http://localhost:8181/api/v2';

postData = {
	"username": "nodetest" + Date.now(),
	"email": "nodetest@email.com",
	"password": "test",
	"active": true,
	"groups": ["member"],
	"created": new Date(),
	"modified": new Date(),
	"metadata": {
		"avatar": "",
		"name": "Node Test User"
	}
};

describe('Testing: API Server', function () {

	it('POST - /api/v2/users/register - should return user on successful registation', function (done) {
		request(auth)
			.post('/api/v2/users/register')
			.send(postData)
			.expect("Content-Type", /json/)
			.expect(201, done);
	});

	it('POST - /api/v2/users/login - should return user on successful login', function (done) {
		var validUser = {
			username: 'nodetest',
			password: 'test'
		};
		request(auth)
			.post('/api/v2/users/login')
			.send(validUser)
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
	it('POST - /api/v2/users/login - should return false on unsuccessful login', function (done) {
		var invalidUser = {
			username: 'test1',
			password: 'wrongpassword'
		};
		request(auth)
			.post('/api/v2/users/login')
			.send(invalidUser)
			.expect("Content-Type", /json/)
			.expect(404, done);
	});

});
