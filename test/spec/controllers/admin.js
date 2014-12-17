'use strict';
describe('Controller: AdminCtrl', function() {
  var AdminCtrl, scope;
  AdminCtrl = null;
  scope = null;
  beforeEach(module('angularCmsApp'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
