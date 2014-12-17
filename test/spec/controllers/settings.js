'use strict';
describe('Controller: SettingsCtrl', function() {
  var SettingsCtrl, scope;
  beforeEach(module('angularCmsApp'));
  SettingsCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return SettingsCtrl = $controller('SettingsCtrl', {
      $scope: scope
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
