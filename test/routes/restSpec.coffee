#Routes Spec
request = require("request")

endpoint = 'http://localhost:8181/api/v2'

describe 'Testing: API Server', () ->
	it "GET - #{endpoint} - should respond with REST API Server v2", (done) ->
		jsonResponse = { message: 'REST API Server v2' }
		request endpoint, (error, response, body) ->
			expect(JSON.parse(response.body)).toEqual jsonResponse
			done()

	it "GET - #{endpoint}/angular-cms/users - should return a list of users", (done) ->
		request "#{endpoint}/angular-cms/users", (error, response, body) ->
			expect(JSON.parse(response.body).length).toBeGreaterThan 0
			done()

	it "POST - #{endpoint}/users/register - create new user object", (done) ->
		postData =
			"username": "nodetest"+Date.now(),
			"email": "nodetest@email.com",
			"password": "test",
			"active": true,
			"groups": ["member"],
			"_activation": "",
			"_key": "",
			"created": new Date(),
			"modified": new Date(),
			"metadata": {"avatar": "", "name": "Node Test User"}

		options =
			uri: "#{endpoint}/users/register"
			method: 'POST'
			json: postData
		request options, (error, response, body) ->
			console.log(body)
			expect(response.status).toBe 'ok'
			done()

