'use strict';
describe('Controller: SidebarCtrl', function() {
  var $rootScope, SidebarCtrl, scope;
  beforeEach(module('angularCmsApp'));
  SidebarCtrl = {};
  scope = {};
  $rootScope = {};
  beforeEach(inject(function($controller, _$rootScope_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $rootScope.App = {
      menu: {
        admin: [
          {
            id: 1,
            title: 'Item 1',
            href: 'item1'
          }, {
            id: 2,
            title: 'Item 2',
            href: 'item2'
          }
        ],
        user: [
          {
            id: 1,
            title: 'Item 1',
            href: 'item1'
          }, {
            id: 2,
            title: 'Item 2',
            href: 'item2'
          }
        ]
      }
    };
    return SidebarCtrl = $controller('SidebarCtrl', {
      $scope: scope,
      $rootScope: $rootScope
    });
  }));
  it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
  it('should have defaults setup', function() {
    expect(scope.selected).toBe(null);
    expect(scope.items).toBe($rootScope.App.menu.user);
    return expect(scope.sidebar.closed).toBe(false);
  });
  it('should toggle the sidebar', function() {
    scope.toggleSidebar();
    expect(scope.sidebar.closed).toBe(true);
    scope.toggleSidebar();
    return expect(scope.sidebar.closed).toBe(false);
  });
  return it('should set selected item.selected to boolean', function() {
    scope.select(scope.items[0]);
    expect($rootScope.App.menu.user[0].selected).toBe(true);
    expect($rootScope.App.menu.user[1].selected).toBe(false);
    scope.select($rootScope.App.menu.admin[0]);
    expect($rootScope.App.menu.admin[0].selected).toBe(true);
    return expect($rootScope.App.menu.admin[1].selected).toBe(false);
  });
});
