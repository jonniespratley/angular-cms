'use strict';
describe('Controller: ThemesCtrl', function() {
  var ThemesCtrl, scope;
  beforeEach(module('angularCmsApp'));
  ThemesCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return ThemesCtrl = $controller('ThemesCtrl', {
      $scope: scope
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
