'use strict';
describe('Controller: UsersCtrl', function() {
  var UsersCtrl, scope;
  beforeEach(module('angularCmsApp'));
  UsersCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return UsersCtrl = $controller('UsersCtrl', {
      $scope: scope
    });
  }));
  it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
  return it('should set selected user on scope', function() {
    scope.selectUser({
      id: 1
    });
    return expect(scope.user.id).toBe(1);
  });
});
