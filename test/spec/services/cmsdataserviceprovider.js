'use strict';
describe('Service: cmsDataServiceProvider', function() {
  var cmsDataServiceProvider;
  beforeEach(module('angularCmsApp'));
  cmsDataServiceProvider = {};
  beforeEach(inject(function(_cmsDataServiceProvider_) {
    return cmsDataServiceProvider = _cmsDataServiceProvider_;
  }));
  return xit('should do something', function() {
    return expect(!!cmsDataServiceProvider).toBe(true);
  });
});
