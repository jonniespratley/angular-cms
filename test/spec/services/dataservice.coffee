'use strict'
describe 'Service: DataService', () ->

	# load the service's module
	beforeEach module 'angularCmsApp'

	# instantiate service
	ds = null
	DataService = null
	$httpBackend = null
	resolvedValue = null
	rejectedValue = null
	dsServiceSpy = null
	$q = null
	$rootScope = null
	successfulResponse = null
	unsuccessfulResponse = null

	beforeEach inject (_$rootScope_, _DataService_, _$httpBackend_, _$q_) ->
		DataService = _DataService_

		ds = DataService
		$httpBackend = _$httpBackend_
		$q = _$q_
		$rootScope = _$rootScope_

	afterEach ->
		$rootScope.$apply()

	it 'should have DataService defined', () ->
		expect(!!ds).toBe true

	it 'should have a fetch method', () ->
		expect(ds.fetch).toBeDefined()

	it 'should have a save method', () ->
		expect(ds.save).toBeDefined()

	it 'should have a create method', () ->
		expect(ds.create).toBeDefined()

	it 'should have a update method', () ->
		expect(ds.update).toBeDefined()

	it 'should have a destroy method', () ->
		expect(ds.destroy).toBeDefined()

	it 'ds.fetch() - should resolve promise on success', () ->
		results = null
		successfulResponse = [{_id: 1}, {_id:2}, {_id:3}]
		$httpBackend.whenGET('/api/v2/angular-cms/users').respond(200, successfulResponse)
		promise = ds.fetch('users')
		promise.then((data)->
			results = data
		)
		expect(results).toBeNull()
		$httpBackend.flush()
		expect(results.length).toBe(3)

	it 'ds.fetch() - should reject promise on error', () ->
		results = null
		unsuccessfulResponse = {status: false, message: 'The collection does not exist.'}
		$httpBackend.whenGET('/api/v2/angular-cms/users').respond(404, unsuccessfulResponse)
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

	it 'ds.save("users", {name: "Jonnie"}) - should resolve promise on success', () ->
		spyOn(ds, 'create').andCallThrough()
		results = null
		successfulResponse = {status: true, results: [
			{id: 1}
		]}
		$httpBackend.whenPOST('/api/v2/angular-cms/users').respond(200, successfulResponse)

		#TODO - Change to your promise
		promise = ds.save('users', { name: 'Jonnie' })
		promise.then(
			(data)->
				results = data
		,
		(error)->
			results = error
		)
		expect(results).toBeNull()
		$httpBackend.flush()
		expect(ds.create).toHaveBeenCalled()
		expect(results.status).toBe(true)

	it 'ds.save() - should reject promise on error', () ->
		results = null
		unsuccessfulResponse = {status: false, message: 'Does not exist.'}
		$httpBackend.whenPOST('/api/v2/angular-cms/users').respond(404, unsuccessfulResponse)

		#TODO - Change to your promise
		promise = ds.save('users', { name: 'Jonnie' })
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
