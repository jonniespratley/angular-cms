'use strict';

describe('Controller: DocsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularCmsBaseApp'));

  var DocsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DocsCtrl = $controller('DocsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
