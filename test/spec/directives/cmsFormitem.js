'use strict';

describe('Directive: cmsFormitem', function () {

  // load the directive's module
  beforeEach(module('angularCmsBaseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cms-formitem></cms-formitem>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cmsFormitem directive');
  }));
});
