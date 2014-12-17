'use strict';
describe('Directive: cmsHeader', function() {
  var scope;
  beforeEach(module('angularCmsApp'));
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    return scope = $rootScope.$new();
  }));
  return it('should make hidden element visible', inject(function($compile) {
    var element;
    element = angular.element('<cms-header></cms-header>');
    return element = $compile(element)(scope);
  }));
});
