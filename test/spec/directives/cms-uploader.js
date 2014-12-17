'use strict';
describe('Directive: cmsUploader', function() {
  var scope;
  beforeEach(module('angularCmsApp'));
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    return scope = $rootScope.$new();
  }));
  return xit('should make hidden element visible', inject(function($compile) {
    var element;
    element = angular.element('<cms-uploader></cms-uploader>');
    element = $compile(element)(scope);
    return expect(element.text()).toBe('this is the cmsUploader directive');
  }));
});
