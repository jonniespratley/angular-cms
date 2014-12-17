'use strict';
describe('Controller: PagesCtrl', function() {
  var PagesCtrl, scope;
  beforeEach(module('angularCmsApp'));
  PagesCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    return PagesCtrl = $controller('PagesCtrl', {
      $scope: scope,
      $log: $injector.get('$log'),
      pages: [],
      DataService: $injector.get('DataService')
    });
  }));
  return it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
