'use strict';

describe('Directive: components', function () {
  beforeEach(module('angularCmsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<components></components>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the components directive');
  }));
});
