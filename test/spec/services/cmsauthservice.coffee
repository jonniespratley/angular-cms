'use strict'
describe 'Service: cmsAuthService', () ->
	
	# load the service's module
	beforeEach module 'angularCmsApp'
	
	# instantiate service
	cmsAuthService = null
	httpBackend = null
	
	successfulResponse = 
		status: true
		user: null
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
			cmsAuthService.authorize(username: 'admin', password: 'admin')
		
	
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
			cmsAuthService.authorize(username: 'admin', password: 'admin')
		
	

	describe 'Unsuccessful registration', () ->
		beforeEach ->
			httpBackend.whenPOST('/api/v2/users/register').respond(unsuccessfulResponse)
		
		it 'should reject a promise on unsuccessful registration', () ->
		
	