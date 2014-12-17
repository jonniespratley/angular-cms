'use strict';
describe('Directive: cmsGravatar', function() {
  var scope;
  beforeEach(module('angularCmsApp'));
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    return scope = $rootScope.$new();
  }));
  return it('should make hidden element visible', inject(function($compile) {
    var element;
    element = angular.element('<cms-gravatar></cms-gravatar>');
    element = $compile(element)(scope);
    return expect(element.text()).toBe('this is the cmsGravatar directive');
  }));
});
