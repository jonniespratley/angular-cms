'use strict';
describe('Service: cmsDataServiceFactory', function() {
  var cmsDataServiceFactory;
  beforeEach(module('angularCmsApp'));
  cmsDataServiceFactory = {};
  beforeEach(inject(function(_cmsDataServiceFactory_) {
    return cmsDataServiceFactory = _cmsDataServiceFactory_;
  }));
  return it('should do something', function() {
    return expect(!!cmsDataServiceFactory).toBe(true);
  });
});
