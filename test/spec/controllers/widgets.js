'use strict';
describe('Controller: WidgetsCtrl', function() {
  var WidgetsCtrl, scope;
  beforeEach(module('angularCmsApp'));
  WidgetsCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return WidgetsCtrl = $controller('WidgetsCtrl', {
      $scope: scope
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
