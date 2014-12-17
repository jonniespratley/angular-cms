'use strict';
describe('Directive: cmsWidgets', function() {
  var scope;
  beforeEach(module('angularCmsApp'));
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    return scope = $rootScope.$new();
  }));
  return xit('should make hidden element visible', inject(function($compile) {
    var element;
    element = angular.element('<cms-widgets></cms-widgets>');
    element = $compile(element)(scope);
    return expect(element.text()).toBe('this is the cmsWidgets directive');
  }));
});
