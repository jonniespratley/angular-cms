'use strict';
describe('Controller: RegisterCtrl', function() {
  var RegisterCtrl, scope;
  beforeEach(module('angularCmsApp'));
  RegisterCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return RegisterCtrl = $controller('RegisterCtrl', {
      $scope: scope
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
