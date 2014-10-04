'use strict'
describe 'Service: cmsSessionService', () ->
	# load the service's module
	beforeEach module 'angularCmsApp'

	# instantiate service
	cmsSessionService = {}
	cookieStore = null
	beforeEach inject (_cmsSessionService_, _$cookieStore_) ->
		cmsSessionService = _cmsSessionService_
		cookieStore = _$cookieStore_

	afterEach ->
		cookieStore.remove('App.session')


	it 'should do something', () ->
		expect(!! cmsSessionService).toBe true

	it 'should get cookie from $cookieStore', () ->
		cookieStore.put('App.session', { user: {username: 'Jonnie'} })
		spyOn(cookieStore, 'get').andCallThrough()
		session = cmsSessionService.getSession()
		expect(cookieStore.get).toHaveBeenCalled()
		expect(session.user.username).toBe('Jonnie')
