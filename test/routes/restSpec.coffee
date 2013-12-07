#Routes Spec
request = require("request")

describe 'Testing api endpoint', () ->
	it "should respond with hello world", (done) ->
		jsonResponse = { message: ' REST API Server v2' }
		request "http://localhost:8181/api/v2", (error, response, body) ->
			expect(JSON.prase(response.body)).toEqual jsonResponse
			done()

