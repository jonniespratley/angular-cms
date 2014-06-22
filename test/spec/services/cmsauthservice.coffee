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
		
		it 'should resolve a promise on successful registration', () ->
			cmsAuthService.register(username: 'admin', password: 'admin')
		
	

	describe 'Unsuccessful registration', () ->
		beforeEach ->
			httpBackend.whenPOST('/api/v2/users/register').respond(unsuccessfulResponse)
		
		it 'should reject a promise on unsuccessful registration', () ->
		
	