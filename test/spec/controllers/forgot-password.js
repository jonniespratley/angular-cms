'use strict';
describe('Controller: ForgotPasswordCtrl', function() {
  var ForgotPasswordCtrl, scope;
  beforeEach(module('angularCmsApp'));
  ForgotPasswordCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return ForgotPasswordCtrl = $controller('ForgotPasswordCtrl', {
      $scope: scope
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
