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

	beforeEach inject (_$rootScope_, _DataService_, _$httpBackend_, _$q_) ->
		DataService = _DataService_
		
		ds = DataService
		$httpBackend = _$httpBackend_
		$q = _$q_
		$rootScope = _$rootScope_
		
		dsServiceSpy = spyOn(ds, "fetch").andCallFake(->
			mockData = 
				results: [
					id: "1"
					anotherProp: 123
				]
			d = $q.defer()
			d.resolve(mockData)
			d.promise
		)
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