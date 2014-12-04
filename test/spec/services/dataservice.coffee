'use strict'
describe 'Service: DataService', () ->

	# load the service's module
	beforeEach module 'angularCmsApp'

	# instantiate vars
	baseUrl = '/api/v2/angular-cms'
	ds = null
	$httpBackend = null
	$q = null
	$rootScope = null

	successCallback = null
	errorCallback = null

	testObject =
		_id: 1
		title: 'Test Object'
		body: 'This is a sample object for testing.'

	beforeEach inject (_$rootScope_, _DataService_, _$httpBackend_, _$q_) ->
		ds = _DataService_
		$httpBackend = _$httpBackend_
		$q = _$q_
		$rootScope = _$rootScope_
		successCallback = jasmine.createSpy('success')
		errorCallback = jasmine.createSpy('error')

	it 'should have DataService defined', () ->
		expect(!!ds).toBe true

	it 'should have a fetch method', () ->
		expect(ds.fetch).toBeDefined()

	it 'should have a save method', () ->
		expect(ds.save).toBeDefined()

	it 'should have a destroy method', () ->
		expect(ds.destroy).toBeDefined()

	it 'should invoke create method if _id is not on object', () ->
		$httpBackend.expectPOST("#{baseUrl}/posts").respond(200, [{}, {}])
		spyOn(ds, '_create')
		spyOn(ds, '_update')
		ds.save('posts', {title: 'New Post'} ).then(successCallback, errorCallback)
		$httpBackend.flush()
		expect(successCallback).toHaveBeenCalled()
		expect(errorCallback).not.toHaveBeenCalled()
		expect(ds._create).toHaveBeenCalled()
		expect(ds._update).not.toHaveBeenCalled()

	it 'should invoke update method if _id is on object', () ->
		$httpBackend.expectPUT("#{baseUrl}/posts/1").respond(200, {message: 'Success updating object'})
		spyOn(ds, '_create')
		spyOn(ds, '_update')
		ds.save('posts', testObject).then(successCallback, errorCallback)
		$httpBackend.flush()
		expect(successCallback).toHaveBeenCalled()
		expect(errorCallback).not.toHaveBeenCalled()
		expect(ds._create).not.toHaveBeenCalled()
		expect(ds._update).toHaveBeenCalled()

	it 'GET - /collection - should reject promise on error', () ->
		$httpBackend.expectGET("#{baseUrl}/posts").respond(404, {message: 'Data not found'})
		ds.fetch( 'posts' ).then(successCallback, errorCallback)
		$httpBackend.flush()
		expect(successCallback).not.toHaveBeenCalled()
		expect(errorCallback).toHaveBeenCalled()

	it 'GET - /collection - should resolve promise on success', () ->
		$httpBackend.expectGET("#{baseUrl}/posts").respond(200, [{}, {}])
		ds.fetch( 'posts' ).then(successCallback, errorCallback)
		$httpBackend.flush()
		expect(successCallback).toHaveBeenCalled()
		expect(errorCallback).not.toHaveBeenCalled()

	it 'GET - /collection/id - should reject promise on error', () ->
		$httpBackend.expectGET("#{baseUrl}/posts/1").respond(404, {message: 'Data not found'})
		ds.get( 'posts', 1 ).then(successCallback, errorCallback)
		$httpBackend.flush()
		expect(successCallback).not.toHaveBeenCalled()
		expect(errorCallback).toHaveBeenCalled()

	it 'GET - /collection/id - should resolve promise on success', () ->
		$httpBackend.expectGET("#{baseUrl}/posts/1").respond(200, testObject)
		ds.get( 'posts', 1 ).then(successCallback, errorCallback)
		$httpBackend.flush()
		expect(successCallback).toHaveBeenCalled()
		expect(errorCallback).not.toHaveBeenCalled()

	it 'DELETE - /collection/id - should resolve promise on success', () ->
		$httpBackend.expectDELETE("#{baseUrl}/posts/1").respond(200, {message: 'Success deleting object'})
		ds.destroy( 'posts', testObject ).then(successCallback, errorCallback)
		$httpBackend.flush()
		expect(successCallback).toHaveBeenCalled()
		expect(errorCallback).not.toHaveBeenCalled()

	it 'DELETE - /collection/id - should reject promise on error', () ->
		$httpBackend.expectDELETE("#{baseUrl}/posts/1").respond(404, {message: 'Error deleting object'})
		ds.destroy( 'posts', testObject ).then(successCallback, errorCallback)
		$httpBackend.flush()
		expect(successCallback).not.toHaveBeenCalled()
		expect(errorCallback).toHaveBeenCalled()

