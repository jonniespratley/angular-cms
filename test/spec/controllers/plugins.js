'use strict';
describe('Controller: PluginsCtrl', function() {
  var PluginsCtrl, scope;
  beforeEach(module('angularCmsApp'));
  PluginsCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return PluginsCtrl = $controller('PluginsCtrl', {
      $scope: scope
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
