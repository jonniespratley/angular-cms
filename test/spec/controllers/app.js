'use strict';
describe('Controller: AppCtrl', function() {
  var AppCtrl, scope;
  beforeEach(module('angularCmsApp'));
  AppCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return AppCtrl = $controller('AppCtrl', {
      $scope: scope
    });
  }));
  return it('it should have name on scope', function() {
    return expect(scope.name).toBe('AppCtrl');
  });
});
