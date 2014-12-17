'use strict';
describe('Controller: ProfileCtrl', function() {
  var ProfileCtrl, scope;
  beforeEach(module('angularCmsApp'));
  ProfileCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return ProfileCtrl = $controller('ProfileCtrl', {
      $scope: scope
    });
  }));
  return xit('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
});
