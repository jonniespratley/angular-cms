'use strict'

describe 'Controller: SidebarCtrl', () ->

	# load the controller's module
	beforeEach module 'angularCmsApp'

	SidebarCtrl = {}
	scope = {}
	$rootScope = {}

	# Initialize the controller and a mock scope
	beforeEach inject ($controller, _$rootScope_) ->
		$rootScope = _$rootScope_
		scope = $rootScope.$new()

		$rootScope.App =
			menu:
				admin: [
					{id: 1, title: 'Item 1', href: 'item1'}
					{id: 2, title: 'Item 2', href: 'item2'}
				]
				user: [
					{id: 1, title: 'Item 1', href: 'item1'}
					{id: 2, title: 'Item 2', href: 'item2'}
				]
		SidebarCtrl = $controller 'SidebarCtrl', {
			$scope: scope
			$rootScope: $rootScope
		}

	it 'should attach a list of awesomeThings to the scope', () ->
		expect(scope.awesomeThings.length).toBe 3

	it 'should have defaults setup', () ->
		expect(scope.selected).toBe(null)
		expect(scope.items).toBe($rootScope.App.menu.user)
		expect(scope.sidebar.closed).toBe(false)

	it 'should toggle the sidebar', () ->
		scope.toggleSidebar()
		expect(scope.sidebar.closed).toBe(true)
		scope.toggleSidebar()
		expect(scope.sidebar.closed).toBe(false)

	it 'should set selected item.selected to boolean', () ->
		scope.select(scope.items[0])
		expect($rootScope.App.menu.user[0].selected).toBe(true)
		expect($rootScope.App.menu.user[1].selected).toBe(false)

		scope.select($rootScope.App.menu.admin[0])
		expect($rootScope.App.menu.admin[0].selected).toBe(true)
		expect($rootScope.App.menu.admin[1].selected).toBe(false)
