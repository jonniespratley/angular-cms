'use strict';
describe('Controller: DocsCtrl', function() {
  var DocsCtrl, scope;
  beforeEach(module('angularCmsApp'));
  DocsCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return DocsCtrl = $controller('DocsCtrl', {
      $scope: scope
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
