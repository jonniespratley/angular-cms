'use strict';
describe('Controller: HelpCtrl', function() {
  var HelpCtrl, scope;
  beforeEach(module('angularCmsApp'));
  HelpCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return HelpCtrl = $controller('HelpCtrl', {
      $scope: scope
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
