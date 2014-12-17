'use strict';
describe('Controller: LoginCtrl', function() {
  var LoginCtrl, scope;
  beforeEach(module('angularCmsApp'));
  LoginCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));
  it('should have a null user object', function() {
    return expect(scope.user).toBeNull;
  });
  it('should have a login method defined', function() {
    return expect(scope.login).toBeDefined;
  });
  return it('should have a logout method defined', function() {
    return expect(scope.logout).toBeDefined;
  });
});
