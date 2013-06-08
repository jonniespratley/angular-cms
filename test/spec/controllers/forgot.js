'use strict';

describe('Controller: ForgotCtrl', function () {

  // load the controller's module
  beforeEach(module('angularCmsApp'));

  var ForgotCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    ForgotCtrl = $controller('ForgotCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
