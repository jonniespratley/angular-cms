'use strict';
describe('Controller: DashboardCtrl', function() {
  var DashboardCtrl, scope;
  beforeEach(module('angularCmsApp'));
  DashboardCtrl = {};
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));
  it('should attach a list of awesomeThings to the scope', function() {
    return expect(scope.awesomeThings.length).toBe(3);
  });
  return xit('should toggle full screen when fullscreen button is clicked', function() {
    spyOn(window, 'webkitRequestFullscreen');
    $scope.fullscreen();
    return expect(window.webkitRequestFullscreen).toHaveBeenCalled();
  });
});
