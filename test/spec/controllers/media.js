'use strict';
describe('Controller: MediaCtrl', function() {
  var MediaCtrl, scope;
  beforeEach(module('angularCmsApp'));
  MediaCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return MediaCtrl = $controller('MediaCtrl', {
      $scope: scope
    });
  }));
  return xit('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
