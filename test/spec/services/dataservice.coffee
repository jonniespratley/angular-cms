'use strict'
describe 'Service: DataService', () ->

	# load the service's module
	beforeEach module 'angularCmsApp'

	# instantiate service
	DataService = null
	httpBackend = null

	beforeEach inject (_DataService_, _$httpBackend_) ->
		DataService = _DataService_
		httpBackend = _$httpBackend_

	it 'should have DataService defined', () ->
		expect(!!DataService).toBe true

	it 'should have a fetch method', () ->
		expect(DataService.fetch).toBeDefined()

	it 'should have a save method', () ->
		expect(DataService.save).toBeDefined()

	it 'should have a create method', () ->
		expect(DataService.create).toBeDefined()

	it 'should have a update method', () ->
		expect(DataService.update).toBeDefined()		

	it 'should have a destroy method', () ->
		expect(DataService.destroy).toBeDefined()