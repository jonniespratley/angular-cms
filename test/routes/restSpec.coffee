#Routes Spec
request = require("request")

endpoint = 'http://localhost:8181/api/v2'

describe 'Testing: API Server', () ->
	it "GET - /api/v2 - should respond with REST API Server v2", (done) ->
		jsonResponse = { message: 'REST API Server v2' }
		request endpoint, (error, response, body) ->
			expect(JSON.parse(response.body)).toEqual jsonResponse
			done()

	it "GET - /angular-cms/users - should return a list of users", (done) ->
		request "#{endpoint}/angular-cms/users", (error, response, body) ->
			expect(JSON.parse(response.body).length).toBeGreaterThan 0
			done()

	it "POST - /angular-cms/users - should create and return object", (done) ->
		postData =
			"username": "nodetest",
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
			uri: "#{endpoint}/angular-cms/users"
			method: 'POST'
			json: postData
		request options, (error, response, body) ->
			console.log(body)
			expect(response.status).toBe 'ok'
			done()

