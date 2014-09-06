'use strict'
describe 'Service: cmsAuthService', () ->

	# load the service's module
	beforeEach module 'angularCmsApp'

	# instantiate service
	cmsAuthService = null
	httpBackend = null

	successfulResponse =
		"success": true,
		"result": {
			"_id": "537e75385b11c600e0968da7",
			"email": "test1@email.com",
			"password": "9bfc2a094175a37a07c41986aa9ab4350c2c31ab",
			"metadata": {
				"avatar": "",
				"name": "Jonnie Dollas"
			}
		}

	unsuccessfulResponse =
		status: false
		error: true
		message: 'No user found!'


	beforeEach inject (_cmsAuthService_, _$httpBackend_) ->
		cmsAuthService = _cmsAuthService_
		httpBackend = _$httpBackend_

	it 'should define the Auth Service', () ->
		expect(!! cmsAuthService).toBe true

	describe 'Successful login', () ->
		beforeEach ->
			httpBackend.whenPOST('/api/v2/users/login').respond(successfulResponse)

		it 'should resolve a promise on successful auth', () ->
			user = null
			expect(user).toBeNull()

			cmsAuthService.authorize(email: 'test@email.com', password: 'fred').then( (data)->
				user = data.results
				expect(user).not.toBeNull()
				expect(user.email).toBe('test@email.com')
			)



	describe 'Unsuccessful login', () ->
		beforeEach ->
			httpBackend.whenPOST('/api/v2/users/login').respond(unsuccessfulResponse)

		it 'should reject a promise on unsuccessful auth', () ->
			#code

	#User Registration
	describe 'Successful registration', () ->
		beforeEach ->
			httpBackend.whenPOST('/api/v2/users/register').respond(successfulResponse)


	describe 'Unsuccessful registration', () ->

		it 'should reject a promise on unsuccessful registration', () ->

	it 'should resolve promise on success', () ->
		results = null
		successfulResponse = {status: true, results: [{id: 1}]}
		httpBackend.whenPOST('/api/v2/users/register').respond(successfulResponse)

		#TODO - Change to your promise
		promise = cmsAuthService.register(username: 'admin', password: 'admin')
		promise.then(
			(data)->
				results = data
		,
			(error)->
				results = error
		)
		expect(results).toBeNull()
		httpBackend.flush()
		expect(results.status).toBe(true)

	xit 'should reject promise on error', () ->
		results = null
		unsuccessfulResponse = {status: false, message: 'Does not exist.'}
		$httpBackend.whenGET('/api/v2/angular-cms/users').respond(404, unsuccessfulResponse)

		#TODO - Change to your promise
		promise = ds.fetch('users')
		promise.then(
			(data)->
				results = data
		,
			(error)->
				results = error
		)
		expect(results).toBeNull()
		$httpBackend.flush()
		expect(results.status).toBe(false)
