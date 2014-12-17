'use strict';
describe('Directive: cmsPanel', function() {
  var scope;
  beforeEach(module('angularCmsApp'));
  scope = {
    title: 'Test'
  };
  beforeEach(inject(function($controller, $rootScope) {
    return scope = $rootScope.$new();
  }));
  return xit('should make hidden element visible', inject(function($compile) {
    var element;
    element = angular.element('<cms-panel>this is the cmsPanel directive</cms-panel>');
    element = $compile(element)(scope);
    return expect(element.text()).toBe('Test');
  }));
});
